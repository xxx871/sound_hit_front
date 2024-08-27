import type { Metadata } from "next";
import { Palette_Mosaic } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/layouts/Header/Header";
import Footer from "@/app/components/layouts/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const palettemosaic = Palette_Mosaic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",  
  variable: "--font-palettemosaic",
  preload: true,
}); 

export const metadata: Metadata = {
  title: "おんぴしゃ | 発声直後の声の高さをドンピシャで当てる音声測定サービス",
  description: "おんぴしゃは、カラオケや楽器演奏で最初の1音目をドンピシャで当てれるように練習するための音声測定サービスです。",
  metadataBase: new URL('https://www.sound-hit.com/'),
  keywords: "おんぴしゃ, 音程, カラオケ, 楽器演奏, 音声測定, 声の高さ",
  openGraph: {
    title: "おんぴしゃ | 発声直後の声の高さをドンピシャで当てる音声測定サービス",
    description: "おんぴしゃは、カラオケや楽器演奏で最初の1音目をドンピシャで当てれるように練習するための音声測定サービスです。",
    url: "https://www.sound-hit.com/",
    siteName: "おんぴしゃ",
  },
  verification: {
		google: "GgsmpZNoDR1IT_-__Uyh4PE4KfAazbqCbd_oHQ9eVAU",
	},
  twitter: {
    card: "summary_large_image",
    title: "おんぴしゃ | 声の高さを測定する音声サービス",
    description: "カラオケや楽器演奏の上達に！最初の1音をドンピシャで当てる練習ができる音声測定サービス",
  },
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
      <GoogleAnalytics gaId={process.env.GA_ID ?? ""} />
    </html>
  );
}
