import * as React from "react";

export const GroupContainerBorder = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className="tw-w-full tw-border-solid tw-border-4 tw-border-gray-800 tw-flex tw-flex-col sm:tw-flex-row"
  />
);
