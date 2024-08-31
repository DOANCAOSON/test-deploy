import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/tin-tuc/Navbar";

export const metadata: Metadata = {
  title: "OKCHOI | Cập nhật Tỷ số bóng đá, kết quả bóng đá mới nhất hôm nay",
  description:
    "OKCHOI | Cập nhật Tỷ số bóng đá, kết quả bóng đá mới nhất hôm nay",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[calc(100vh-344px)]">
      <Navbar />
      <div className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
        {children}
      </div>
    </main>
  );
}
