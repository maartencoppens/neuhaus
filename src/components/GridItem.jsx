import React, { useEffect, useState } from "react";

const GridItem = ({ praline, isSelected, onSelect }) => {
  const fallback = "/fallback.webp";
  const [src, setSrc] = useState(praline.image || fallback);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSrc(praline.image || fallback);
  }, [praline.image]);

  return (
    <button
      type="button"
      className={`praline-cell border-0 p-0 appearance-none ${
        isSelected ? "selected" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <span className={`praline-cell-label ${isHovered ? "visible" : ""}`}>
        {praline.name}
      </span>
    </button>
  );
};

export default GridItem;
