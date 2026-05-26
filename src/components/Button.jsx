import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, link, variant, className }) => {
  if (variant === "secondary") {
    return (
      <Link
        to={link}
        className={`block px-md py-sm border-2 border-primary hover:bg-gold-hover rounded-xs text-center ${className || ""}`}
      >
        {label}
      </Link>
    );
  } else {
    return (
      <Link
        to={link}
        className={`block px-md py-sm bg-primary hover:bg-gold-hover rounded-xs text-center ${className || ""}`}
      >
        {label}
      </Link>
    );
  }
};

export default Button;
