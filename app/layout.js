import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Poppins } from 'next/font/google';
import { Hind_Madurai } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutManager from "./components/LayoutManager";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

const poppins = Poppins({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const hind = Hind_Madurai({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-hind',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GoTrip",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`}>
        <LayoutManager>{children}</LayoutManager>
      </body>
    </html>
  );
}
