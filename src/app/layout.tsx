import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Icon Library",
  description: "Icon Library",
  metadataBase: new URL('https://manuelyemohblog.netlify.app/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ReduxProvider>
          {children}
          </ReduxProvider>
        </ThemeProvider>
        </body>
    </html>
  );
}
