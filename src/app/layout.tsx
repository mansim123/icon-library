import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReduxProvider } from "@/redux/provider";


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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ReduxProvider>
          {children}
          </ReduxProvider>
        </ThemeProvider>
        </body>
    </html>
  );
}
