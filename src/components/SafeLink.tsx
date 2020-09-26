import * as React from "react";

export const SafeLink = ({
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a {...props} target="_blank" rel="noopener noreferrer" /> // eslint-disable-line
);
