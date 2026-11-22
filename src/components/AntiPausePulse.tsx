'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'chemai_last_heartbeat_pulse';
const PULSE_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 giờ một lần

export default function AntiPausePulse() {
  useEffect(() => {
    // 1. Tự động tắt trạng thái Netlify badge trong localStorage
    try {
      localStorage.setItem('nl-hud:public:v1', JSON.stringify({ dismissed: true, hidden: true, closed: true }));
    } catch {}

    // 2. Tự động phát hiện và gỡ bỏ iframe Powered by Netlify nếu bị chèn vào DOM
    if (typeof window !== 'undefined') {
      const purgeNetlifyBadge = () => {
        try {
          const badgeFrame = document.getElementById('nl-badge-frame') || 
                             document.querySelector('iframe[title*="Netlify" i]') ||
                             document.querySelector('iframe[title*="Powered by Netlify" i]');
          if (badgeFrame) {
            badgeFrame.remove();
          }
          const drawer = document.getElementById('netlify-drawer-container') || document.querySelector('netlify-drawer');
          if (drawer) {
            drawer.remove();
          }
        } catch {}
      };

      purgeNetlifyBadge();

      // Giám sát trường hợp badge bị inject bất đồng bộ sau khi load trang
      const observer = new MutationObserver(() => purgeNetlifyBadge());
      observer.observe(document.body, { childList: true, subtree: true });

      // Dọn dẹp listener sau 10s khi trang đã ổn định
      setTimeout(() => observer.disconnect(), 10000);
    }

    // 3. Keepalive nhịp tim ngầm cho serverless
    try {
      const lastPulse = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      if (!lastPulse || now - parseInt(lastPulse, 10) > PULSE_INTERVAL_MS) {
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
