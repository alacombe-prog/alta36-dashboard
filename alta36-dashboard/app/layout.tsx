import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alta 36 - Sales Command Center",
  description: "AI-Powered B2B Prospection Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body className="font-sans antialiased bg-background text-foreground">
         {children}
      </body>
      {/* Note: Google Fonts import is commented out until I can confirm dependencies are installed, defaulting to system font via tailwind config for now */}
    </html>
  );
}
