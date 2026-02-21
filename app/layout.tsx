import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "@/app/providers";

import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BottomNavbar from "@/components/BottomNavbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Olaluxe.ng | Premium Jewelry & Accessories",
  description: "Shop premium minimalist jewelry and luxury female essentials at olaluxe.ng.",
  icons: {
    icon: '/logo1.svg',
    apple: '/logo1.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-bg-warm-beige text-text-deep-charcoal grain-texture min-h-screen`}>
        <Providers>
          <AuthProvider>
            <CartProvider>
              {children}
              <Footer />
              <CartDrawer />
              <BottomNavbar />
              <Toaster position="bottom-right" />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
