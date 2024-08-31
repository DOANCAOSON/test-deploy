import React from "react";
import Sidebar from "@/components/tin-tuc/Sidebar";
import NewsDetail from "@/components/tin-tuc/NewsDetail";

async function page() {
  return (
    <div className="flex gap-4 py-2 justify-center flex-col md:container md:flex-row">
      <main className="w-full md:w-9/12">
        <NewsDetail />
      </main>
      <Sidebar />
    </div>
  );
}

page.propTypes = {};

export default page;
