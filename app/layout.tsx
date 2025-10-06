import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import ClientOnly from "@/components/client-only";
import Navbar from "@/components/Navbar";
//import FlashlightEffect from "@/components/FlashlightEffect";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oskaz - E-Commerce Platform",
  description: "Oskaz - Modern e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientOnly>
            <LanguageProvider defaultLanguage="en" storageKey="oskaz-language">
              {/* <FlashlightEffect /> */}
              <Navbar />
              <div className="pt-12">
                {children}
              </div>
            </LanguageProvider>
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
