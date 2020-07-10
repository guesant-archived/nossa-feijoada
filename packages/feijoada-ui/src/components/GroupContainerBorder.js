import * as React from "react";

const GroupContainerBorder = ({ children }) => (
  <div
    className="tw-w-full tw-border-solid tw-border-4 tw-border-gray-800 tw-flex tw-flex-col sm:tw-flex-row"
  >
    {children}
  </div>
);

export default GroupContainerBorder;
