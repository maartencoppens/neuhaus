import React from "react";

const InfoLabel = ({ icon, label }) => {
  return (
    <div className="flex gap-xs items-center text-text-light">
      <img src={`/icons/${icon}.svg`} alt={`Icon for ${icon}`} />
      <span className="uppercase">{label}</span>
    </div>
  );
};

export default InfoLabel;
