import type { Metadata } from "next";
import {ClerkProvider} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utilities/theme-provider";
import { LanguageProvider } from "@/components/utilities/language-provider";
//import ClientOnly from "@/components/client-only";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/toast";
import MarketingBar from "@/components/MarketingBar";
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
    <ClerkProvider>
     
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           <ToastProvider>
          <LanguageProvider defaultLanguage="en" storageKey="oskaz-language">
            {/* <FlashlightEffect /> */}
            {/* <ClientOnly> */}
            <CartProvider>
              <Navbar />
              <div className="">{children}</div>
            </CartProvider>
            <Footer />
            <MarketingBar/>
          </LanguageProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
