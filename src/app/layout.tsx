import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  title: "HCC - ChemAI | Hệ Thống Trợ Lý & Mô Phỏng Hóa Học Lớp 10 (2026)",
  description: "Phòng thí nghiệm ảo 2D/3D, gia sư AI giải đáp hóa học, tạo đề thi, soạn giáo án 5512 và dự án STEM dành cho giáo viên & học sinh THPT.",
  keywords: ["Hóa học 10", "Thí nghiệm ảo", "ChemAI", "Mô phỏng 3D hóa học", "GDPT 2018", "Giáo án 5512", "STEM Hóa học"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-[#f8fafc] overflow-x-hidden w-full selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
