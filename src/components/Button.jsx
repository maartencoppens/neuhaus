import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, link }) => {
  return (
    <Link
      to={link}
      className="w-fit px-md py-sm bg-primary hover:bg-gold-hover rounded-xs"
    >
      {label}
    </Link>
  );
};

export default Button;
