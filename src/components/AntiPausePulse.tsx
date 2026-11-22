'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'chemai_last_heartbeat_pulse';
const PULSE_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 giờ một lần

export default function AntiPausePulse() {
  useEffect(() => {
    try {
      const lastPulse = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      if (!lastPulse || now - parseInt(lastPulse, 10) > PULSE_INTERVAL_MS) {
        // Gửi nhịp tim ngầm không làm chậm giao diện
        fetch('/api/keepalive', { method: 'GET', keepalive: true })
          .then(() => {
            localStorage.setItem(STORAGE_KEY, now.toString());
          })
          .catch(() => {
            // Im lặng bỏ qua lỗi nếu đang offline
          });
      }
    } catch {
      // Ignored
    }
  }, []);

  return null;
}
