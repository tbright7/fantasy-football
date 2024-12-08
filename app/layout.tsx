import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSidebarOpen = true;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sky-100 flex flex-col`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "w-64" : "w-16"
            } bg-gray-800 text-white transition-width duration-300 flex flex-col`}
          ></div>
          <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-1 p-4">{children}</main>
            <footer className="bg-gray-300 p-4">
              <p>Footer content</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
