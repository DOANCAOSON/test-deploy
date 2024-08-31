import React from "react";
import ArticleList, { ArticleHotList } from "@/components/tin-tuc/ArticleList";
import Sidebar from "@/components/tin-tuc/Sidebar";

const page = async () => {
  return ( 
    <div className="flex gap-4 py-2 justify-center flex-col md:container md:flex-row">
      <main className="w-full md:w-9/12">
        <ArticleHotList />
        <ArticleList />
      </main>
      <Sidebar />
    </div>
  );
};

export default page;
