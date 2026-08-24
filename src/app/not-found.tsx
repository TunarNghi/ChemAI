import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#020617", color: "#f8fafc", padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: "500px", padding: "32px", borderRadius: "16px", backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h1 style={{ fontSize: "48px", color: "#38bdf8", margin: 0 }}>404</h1>
        <h2 style={{ marginTop: "12px", marginBottom: "16px" }}>Không tìm thấy trang</h2>
        <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển hướng.</p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "10px 24px",
            backgroundColor: "#0284c7",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Trở về Trang Chủ
        </Link>
      </div>
    </div>
  );
}
