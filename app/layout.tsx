import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "@/app/providers";

import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olaluxe.ng | Premium Jewelry & Accessories",
  description: "Shop premium minimalist jewelry and luxury female essentials at olaluxe.ng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <AuthProvider>
            <CartProvider>
              {children}
              <Footer />
              <Toaster position="bottom-right" />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
