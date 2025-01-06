import React from "react";

// Generic component for creating a dynamic SVG icon where the color can be changed
const DynamicSvgIcon = ({ IconComponent, classes }) => {
  return (
    <div>
      <IconComponent className={classes} />
    </div>
  );
};

export default DynamicSvgIcon;
