import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={` w-full py-md border-2 border-primary/40 ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
