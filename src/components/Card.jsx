import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`shadow-[3px_4px_15px_1px_rgba(0,0,0,0.25)] rounded-3xl w-full py-md ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
