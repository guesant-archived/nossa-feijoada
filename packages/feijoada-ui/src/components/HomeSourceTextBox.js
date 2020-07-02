import * as React from "react";
import { useState } from "react";

const HomeSourceTextBox = ({ object, onObjectUpdate }) => {
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
            await onObjectUpdate({ ...object, text: value });
          }}
          type="text"
          className="tw-text-black"
        />
      </div>
    </React.Fragment>
  );
};

export default HomeSourceTextBox;
