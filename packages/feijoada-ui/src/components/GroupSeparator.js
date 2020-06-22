import * as React from "react";

export const GroupSeparatorBase = ({ className = "" }) => (
  <div className={["tw-bg-gray-800 tw-opacity-75", className].join(" ")}></div>
);

export const GroupSeparatorVertical = () => (
  <GroupSeparatorBase
    className="tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block"
  />
);

export const GroupSeparatorHorizontal = () => (
  <GroupSeparatorBase
    className="tw-w-1 sm:tw-w-full sm:tw-h-1 tw-hidden sm:tw-block"
  />
);
