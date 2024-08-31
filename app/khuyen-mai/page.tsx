import Categories from "@/components/khuyen-mai/Categories";
import { getPromotionCategories } from "@/services/promotion";
import React from "react";

const page = () => {
  // const categories = (await getPromotionCategories()) as any;

  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <div className="mx-auto mt-2 md:w-4/5">
          {/* <Categories categories={categories?.data} /> */}
        </div>
      </div>
    </main>
  );
};

export default page;
