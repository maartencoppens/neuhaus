import React, { useState } from "react";

const GridItem = ({ praline }) => {
  const fallback = "/fallback.webp";
  const [src, setSrc] = useState(praline.image || fallback);

  const handleError = () => {
    if (src !== fallback) setSrc(fallback);
  };

  return (
    <div className="aspect-square overflow-hidden bg-background-quaternary rounded-3xl shadow-[inset_0px_0px_16px_0px_rgba(0,0,0,0.3)]">
      <img
        src={praline.image}
        alt={praline.name}
        onError={(e) => {
          console.log("Broken image:", praline.name, praline.image);
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default GridItem;
