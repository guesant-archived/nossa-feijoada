import * as React from "react";
import { padleftArrIndex } from "../helpers/pad-left-arr";
import { PlayGroundExtendProps } from "../routes/playground/extend-playground";
import { SlotImage } from "./PlayGroundSlotImage";
import { SlotTextBox } from "./PlayGroundSlotTextBox";

export const PlayGroundListSlots = ({
  ...extendProps
}: PlayGroundExtendProps) => {
  const { template } = extendProps;
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {template.model.fabricExported.objects.map((object, idx, { length }) => {
        const slotProps = { ...extendProps, object, idx };
        return (
          <React.Fragment
            key={idx}
            children={
              <li>
                <div className="tw-flex tw-flex-wrap">
                  <span>Slot #{padleftArrIndex(idx + 1, { length }, 0)}</span>
                  <span className="tw-mx-1">|</span>
                  {React.createElement(
                    ({ image: SlotImage, textbox: SlotTextBox } as any)[
                      object.type
                    ] || (() => <div />),
                    { ...slotProps },
                  )}
                </div>
              </li>
            }
          />
        );
      })}
    </ul>
  );
};
