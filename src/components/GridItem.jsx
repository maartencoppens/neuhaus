import React, { useEffect, useState } from "react";

const GridItem = ({ praline, isSelected, onSelect }) => {
  const fallback = "/fallback.webp";
  const [src, setSrc] = useState(praline.image || fallback);

  useEffect(() => {
    setSrc(praline.image || fallback);
  }, [praline.image]);

  return (
    <button
      type="button"
      className={`praline-cell border-0 p-0 appearance-none ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onSelect(praline)}
      aria-pressed={isSelected}
    >
      <img
        src={src}
        alt={praline.name}
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
        className="h-full w-full object-cover"
      />
    </button>
  );
};

export default GridItem;
