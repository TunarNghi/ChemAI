import { NextResponse } from 'next/server';
import { supabase, backupSupabase } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function pingDatabase(client: any, targetName: string) {
  const startTime = Date.now();
  const nowIso = new Date().toISOString();

  try {
    const { data: currentData, error: readError } = await client
      .from('system_heartbeat')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    let pingCount = 1;

    if (!readError && currentData) {
      pingCount = (currentData.ping_count || 0) + 1;
      await client
        .from('system_heartbeat')
        .update({
          last_ping: nowIso,
          ping_count: pingCount,
          source: `keepalive_${targetName}`,
          status: 'active'
        })
        .eq('id', 1);
    } else {
      try {
        await client
          .from('system_heartbeat')
          .upsert({
            id: 1,
            last_ping: nowIso,
            ping_count: 1,
            source: `keepalive_init_${targetName}`,
            status: 'active'
          });
      } catch {
        // Ignored if table not created yet
      }

      try {
        await client
          .from('experiments')
          .select('id')
          .limit(1);
      } catch {
        // Ignored
      }
    }

    return {
      target: targetName,
      status: 'active',
      latency_ms: Date.now() - startTime,
      ping_count: pingCount
    };
  } catch (err: any) {
    return {
      target: targetName,
      status: 'error',
      error: err?.message || 'Connection error',
      latency_ms: Date.now() - startTime
    };
  }
}

export async function GET() {
  const nowIso = new Date().toISOString();

  // Ping đồng thời cả Primary và Backup
  const [primaryResult, backupResult] = await Promise.all([
    pingDatabase(supabase, 'primary'),
    pingDatabase(backupSupabase, 'backup')
  ]);

  return NextResponse.json({
    status: 'active',
    keep_alive: 'SUCCESS',
    message: 'Keep-alive pulse registered for Primary & Backup Supabase databases.',
    timestamp: nowIso,
    databases: {
      primary: primaryResult,
      backup: backupResult
    }
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export async function POST() {
  return GET();
}
