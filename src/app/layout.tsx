import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Thay Geist bằng Inter
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

// Cấu hình font Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard built with Next.js",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-gray-100 dark:bg-gray-900`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <aside className="hidden md:block h-screen w-[300px] sticky top-0 border-r bg-white dark:bg-gray-800">
              <Sidebar />
            </aside>
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}