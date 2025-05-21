import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { LayoutHeader, ReduxProvider } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MIMS Tech prueba tecnica",
  description: "Realizada por Jhonny Estruve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased dark:bg-gray-800 dark:text-white`}
      >
        <ReduxProvider>
          <div className="grid grid-rows-[auto_1fr] min-h-screen max-w-2xl mx-auto">
            <LayoutHeader />
            <main className="overflow-auto">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
