import React from "react";

const AnswerLabel = ({ label, className = "" }) => {
  return (
    <div className={`p-sm w-fit border border-border rounded-4xl ${className}`}>
      {label}
    </div>
  );
};

export default AnswerLabel;
