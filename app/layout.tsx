import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SessionWrapper from "@/app/components/SessionWrapper"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Get Me a Chai - Fund Your Creative Projects',
  description: 'A crowdfunding platform designed for creators to fund their projects with the support of their fans.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
    >
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
        <Navbar/>
        <div className="classname= min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">

        
        {children}
        </div>
        <Footer/>
        </SessionWrapper>
        </body>
    </html>
  );
}

