import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OKCHOI | Cập nhật Tỷ số bóng đá, kết quả bóng đá mới nhất hôm nay",
  description:
    "OKCHOI | Cập nhật Tỷ số bóng đá, kết quả bóng đá mới nhất hôm nay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Header />
        {/* <Loading /> */}
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
