import React from "react";

const DynamicSvgIcon = ({ IconComponent, classes }) => {
  return (
    <div>
      {/* Render the passed SVG component with dynamic styling */}
      <IconComponent className={classes} />
    </div>
  );
};

export default DynamicSvgIcon;
