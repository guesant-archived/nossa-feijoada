import { UPDATE_OBJECT } from "@fantastic-images/lib/dist/model/mutations";
import { TemplateObject } from "@fantastic-images/types";
import * as React from "react";
import { Editor } from "../routes/editor";

export const EditorStackPosition = ({
  idx,
  object,
  editor: {
    state: { template },
    updateTemplate,
  },
}: {
  idx: number;
  object: TemplateObject;
  editor: Editor;
}) => {
  const updateObject = async (updated: TemplateObject) => {
    await updateTemplate(UPDATE_OBJECT(idx, updated)(template));
  };
  type ComposedInput = [
    React.HTMLAttributes<HTMLLabelElement>,
    React.InputHTMLAttributes<HTMLInputElement>,
  ];
  const inputs: ComposedInput[] = [
    [
      { children: "x" },
      {
        type: "number",
        value: object.left,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, left: +value });
        },
      },
    ],
    [
      { children: "y" },
      {
        type: "number",
        value: object.top,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, top: +value });
        },
      },
    ],
    [
      { children: "bWth" },
      {
        type: "number",
        value: object.width * object.scaleX,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, scaleX: +value / object.width });
        },
      },
    ],
    [
      { children: "bHgt" },
      {
        type: "number",
        value: object.height * object.scaleY,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, scaleY: +value / object.height });
        },
      },
    ],
    [
      { children: "w" },
      {
        type: "number",
        value: object.width,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, width: +value });
        },
      },
    ],
    [
      { children: "h" },
      {
        type: "number",
        value: object.height,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, height: +value });
        },
      },
    ],
    [
      { children: "sX" },
      {
        type: "number",
        value: object.scaleX,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, scaleX: +value });
        },
      },
    ],
    [
      { children: "sY" },
      {
        type: "number",
        value: object.scaleY,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, scaleY: +value });
        },
      },
    ],
    [
      { children: "a" },
      {
        type: "number",
        value: object.angle,
        onChange: ({ target: { value } }) => {
          updateObject({ ...object, angle: parseFloat(value) });
        },
      },
    ],
  ];
  return (
    <div className="tw-flex tw-flex-col tw-flex-wrap">
      <div className="tw-flex tw-flex-row tw-flex-wrap">
        <div
          style={{
            display: "grid",
            gap: 4,
            gridTemplateColumns:
              "minmax(30px,auto) 90px minmax(30px,auto) 90px",
            alignItems: "center",
          }}
        >
          {inputs
            .map(([label, input], idx) => [
              label,
              input,
              [Math.random(), idx].join("--"),
            ])
            .map(
              ([label, input, id]) =>
                [label, input, id] as [
                  React.HTMLAttributes<HTMLLabelElement>,
                  React.HTMLAttributes<HTMLInputElement>,
                  string,
                ],
            )
            .map(([labelProps, controlProps, id], idx) => (
              <React.Fragment key={idx}>
                <label htmlFor={id} className="tw-mb-0" {...labelProps} />
                <input
                  id={id}
                  className="tw-border-solid tw-border-2 tw-px-1 tw-py-2 tw-mr-2"
                  style={{ maxWidth: "100%" }}
                  {...controlProps}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
