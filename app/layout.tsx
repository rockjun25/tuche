import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "Tuché — 글의 기록",
  description: "예술 글 토론 그룹의 아카이브",
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Tuché",
    description: "글의 기록",
    images: ["/api/og/default"],
    siteName: "Tuché",
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
