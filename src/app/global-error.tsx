"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body style={{ backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", padding: "40px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "60px auto", padding: "30px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", backgroundColor: "#0f172a" }}>
          <h2 style={{ color: "#ef4444", marginBottom: "16px" }}>Đã xảy ra lỗi hệ thống</h2>
          <p style={{ color: "#94a3b8", marginBottom: "24px", lineHeight: "1.6" }}>{error?.message || "Vui lòng tải lại trang để tiếp tục."}</p>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 24px",
              backgroundColor: "#0284c7",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}
