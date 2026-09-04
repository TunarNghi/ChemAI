import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  title: "HCC - ChemAI | Hệ Thống Trợ Lý & Mô Phỏng Hóa Học THPT (2026)",
  description: "Phòng thí nghiệm ảo 2D/3D, gia sư trực tuyến giải đáp hóa học, tạo đề thi, soạn giáo án 5512 và dự án STEM dành cho giáo viên & học sinh THPT.",
  keywords: ["Hóa học THPT", "Thí nghiệm ảo", "ChemAI", "Mô phỏng 3D hóa học", "GDPT 2018", "Giáo án 5512", "STEM Hóa học"],
  authors: [{ name: "HCC - ChemAI Team" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HCC - ChemAI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-[#f8fafc] overflow-x-hidden w-full selection:bg-cyan-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
