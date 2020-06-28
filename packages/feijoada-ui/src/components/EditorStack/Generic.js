import * as React from "react";

const Generic = ({ object, onUpdateObject, baseID }) => {
  return (
    <div className="tw-flex tw-flex-col tw-flex-wrap ">
      <div className="tw-flex tw-flex-row tw-flex-wrap">
        <div
          className="tw-grid tw-grid-cols-2"
          style={{ gridTemplateColumns: "0.75fr 1fr" }}
        >
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
              { children: "width" },
              {
                type: "number",
                value: object.width,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, width: parseInt(value) });
                },
              },
            ],
            [
              { children: "height" },
              {
                type: "number",
                value: object.height,
                onChange: ({ target: { value } }) => {
                  onUpdateObject({ ...object, height: parseInt(value) });
                },
              },
            ],
            [
              { children: "ângulo" },
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
              <React.Fragment key={idx}>
                <label htmlFor={id} className="tw-mb-0" {...labelProps} />
                <input
                  id={id}
                  className="tw-border-solid tw-border-2 tw-w-20 tw-px-1"
                  {...controlProps}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Generic;
