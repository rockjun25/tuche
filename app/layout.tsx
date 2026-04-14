import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "대안학교 | Tuché",
  description: "현대존재론과 비평의 이론과 실제를 추적하는 온라인 강의 사이트",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "대안학교",
    description: "공강 시간에 만드는 온라인 강의 사이트",
    images: ["/api/og/default"],
    siteName: "Tuché",
    url: undefined,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#1A1A1A]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
