import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props extends Article{
  layout?: string
}
const ArticleItem: React.FC<Props> = ({
  title,
  description,
  thumbnails,
  slug,
  categorySlug,
  layout = "row",
}) => {
  return (
    <Link
      className={`group ${
        layout === "row"
          ? "col-span-3 flex flex-col gap-2 md:gap-4 md:flex-row"
          : "gap-2 col-span-3 flex flex-row md:flex-col md:col-span-1"
      }`}
      href={`/tin-tuc/${categorySlug}/${slug}`}
    >
      <Image
        alt=""
        loading="lazy"
        width={400} height={300}
        className="object-cover rounded-lg border w-32 h-20 md:w-80 md:h-52"
        src={thumbnails || "/assets/images/logo-default.png"}
      />
      <div className="flex items-start justify-center flex-col flex-1">
        <p className="font-medium text-sm group-hover:underline md:text-2xl">
          {title}
        </p>
        {description && <p className="hidden md:line-clamp-5">{description}</p>}
      </div>
    </Link>
  );
};

export default ArticleItem;
