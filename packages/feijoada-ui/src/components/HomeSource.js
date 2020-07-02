import * as React from "react";
import HomeSourceTextBox from "./HomeSourceTextBox";

const HomeSource = ({ type, ...props }) =>
  React.createElement(
    {
      textbox: HomeSourceTextBox,
    }[type] || (() => <div></div>),
    { ...props },
  );

export default HomeSource;
