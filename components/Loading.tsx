import React from "react";

function Loading() {
  return (
    <div className="w-40 h-36 bg-background mt-40 text-center  my-0 mx-[auto] sm:rounded-md sm:text-card-foreground  ">
      <div className="w-full block pt-8">
        <div className="animate-rotation inline-block w-12 h-12 border-t-4 border-t-[#f59324] dark:border-t-white border-r-transparent border-solid border-r-4 rounded-full after:absolute after:top-0 after:left-0 after:rounded-full after:border-l-4 after:border-l-[#ff3d00] after:border-b-transparent after:border-solid after:border-b-4 after:w-12 after:h-12 after:animate-rotationrv" />
      </div>
      <div>LOADING...</div>
    </div>
  );
}

export default Loading;
