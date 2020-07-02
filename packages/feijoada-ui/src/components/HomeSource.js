import * as React from "react";
import HomeSourceImage from "./HomeSourceImage";
import HomeSourceTextBox from "./HomeSourceTextBox";

const HomeSource = ({ type, ...props }) =>
  React.createElement(
    {
      image: HomeSourceImage,
      textbox: HomeSourceTextBox,
    }[type] || (() => <div></div>),
    { ...props },
  );

export default HomeSource;
