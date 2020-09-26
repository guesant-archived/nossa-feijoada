import { UPDATE_OBJECT } from "@fantastic-images/lib/dist/model/mutations/update-object";
import * as React from "react";
import { useState } from "react";
import { PlayGroundSlotProps } from "./PlayGroundSlotProps";

export const SlotTextBox = ({
  idx,
  object,
  template,
  updateTemplate,
}: PlayGroundSlotProps) => {
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <button className="tw-not-sr-only" onClick={() => setShow(!show)}>
        Alterar Texto
      </button>
      <div className={[!show && "tw-sr-only"].filter(Boolean).join(" ")}>
        <textarea
          value={object.text}
          onChange={async ({ target: { value } }) => {
            updateTemplate(
              UPDATE_OBJECT(idx, { ...object, text: value })(template),
            );
          }}
          className="tw-text-black"
        />
      </div>
    </React.Fragment>
  );
};
