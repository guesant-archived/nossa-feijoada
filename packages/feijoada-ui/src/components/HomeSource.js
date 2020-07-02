import * as React from "react";

const HomeSource = ({ type, ...props }) =>
  React.createElement(
    {
    }[type] || (() => <div></div>),
    { ...props },
  );

export default HomeSource;
