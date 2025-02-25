import React from "react";

// Generic component for creating a dynamic SVG icon where the color can be changed
const DynamicSvgIcon = ({ IconComponent, classes }) => {
  return <IconComponent className={classes} />;
};

export default DynamicSvgIcon;
