import { Geist, Geist_Mono, Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import { ProductProvider } from '@/context/ProductContext';
import ConditionalLayout from '@/components/ConditionalLayout';
import { EnquiryProvider, InquiryProvider } from "@/context/CartContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Avanta India - Jaipur Kurti Creations",
  description: "Welcome to Avanta India by Jaipur Kurti Creations. Thoughtfully crafted to celebrate heritage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${cinzel.variable} antialiased`}
      >
        <ProductProvider>
          <CartProvider>
            <EnquiryProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
            </EnquiryProvider>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
