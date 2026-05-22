import React from "react";

export default function Container({ children, className = "", ...props }) {
  return (
    <div className={`mx-auto px-4 w-full max-w-7xl ${className}`} {...props}>
      {children}
    </div>
  );
}
