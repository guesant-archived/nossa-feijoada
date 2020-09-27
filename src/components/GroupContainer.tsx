import * as React from "react";

export const GroupContainer = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className="tw-container tw-max-w-3xl tw-mx-auto tw-px-4 tw-flex tw-items-center"
  />
);
