import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, link }) => {
  return (
    <Link
      to={link}
      className="w-fit px-lg py-md bg-primary hover:bg-gold-hover rounded-xs"
    >
      {label}
    </Link>
  );
};

export default Button;
