import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  label,
  link,
  variant,
  className,
  onClick,
  disabled,
  type,
}) => {
  const buttonClassName = `block px-md py-sm rounded-xs text-center ${
    variant === "secondary"
      ? "border-2 border-primary hover:bg-gold-hover"
      : "bg-button text-white hover:bg-gold-hover"
  } ${disabled ? "opacity-50 pointer-events-none" : ""} ${className || ""}`;

  if (variant === "secondary") {
    if (!link) {
      return (
        <button
          type={type || "button"}
          onClick={onClick}
          disabled={disabled}
          className={buttonClassName}
        >
          {label}
        </button>
      );
    }

    return (
      <Link to={link} onClick={onClick} className={buttonClassName}>
        {label}
      </Link>
    );
  } else {
    if (!link) {
      return (
        <button
          type={type || "button"}
          onClick={onClick}
          disabled={disabled}
          className={buttonClassName}
        >
          {label}
        </button>
      );
    }

    return (
      <Link to={link} onClick={onClick} className={buttonClassName}>
        {label}
      </Link>
    );
  }
};

export default Button;
