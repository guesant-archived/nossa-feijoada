import * as React from "react";

const Generic = ({ object, onUpdateObject, baseID }) => {
  return (
    <div className="tw-flex tw-flex-col tw-flex-wrap ">
      <div className="tw-flex tw-flex-row tw-flex-wrap">
        <div>
          {[
            [
              { children: "x" },
              {
                type: "number",
                value: object.left,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, left: parseInt(value) });
                },
              },
            ],
            [
              { children: "y" },
              {
                type: "number",
                value: object.top,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, top: parseInt(value) });
                },
              },
            ],
            [
              { children: "w" },
              {
                type: "number",
                value: object.width,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, width: parseInt(value) });
                },
              },
            ],
            [
              { children: "h" },
              {
                type: "number",
                value: object.height,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, height: parseInt(value) });
                },
              },
            ],
            [
              { children: "a" },
              {
                type: "number",
                value: object.angle,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, angle: parseFloat(value) });
                },
              },
            ],
          ]
            .map((arr, idx) => [...arr, [baseID, idx].join("--")])
            .map(([labelProps, controlProps, id], idx) => (
              <div key={idx}>
                <label
                  htmlFor={id}
                  className="tw-mb-0 tw-w-4"
                  {...labelProps}
                />
                <input
                  id={id}
                  className="tw-border-solid tw-border-2 tw-w-20 tw-px-1"
                  {...controlProps}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Generic;
