import type { Metadata } from "next";
import { Inter, Palette_Mosaic } from "next/font/google";
import "./globals.css";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";

const palettemosaic = Palette_Mosaic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",  
  variable: "--font-palettemosaic",
  preload: true,
}); 

export const metadata: Metadata = {
  title: "Sound Hit",
  description: "Sound Hit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${palettemosaic.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
