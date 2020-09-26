import * as React from "react";
import { FormGeneric } from "../components/FormGeneric";
import { Editor } from "../routes/editor";

const getId = (...refs: string[]) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");
const displayDimension = (val: any) => (val === 0 ? "" : val);

export const EditorCoreSketch = ({
  editor: {
    state: { template },
    updateTemplate,
    reset,
  },
}: {
  editor: Editor;
}) => (
  <div>
    <div className="tw-flex">
      <FormGeneric
        formLabel={{ children: "Largura" }}
        formControl={{
          ...{
            type: "number",
          },
          ...{
            value: displayDimension(template.model.sketch.width),
            onChange: async ({ target: { value } }) => {
              await updateTemplate({
                ...template,
                model: {
                  ...template.model,
                  sketch: {
                    ...template.model.sketch,
                    width: +value,
                  },
                },
              });
            },
          },
        }}
        formGroup={{
          controlId: getId("-editor", "-model", "-sketch", "-width"),
        }}
      />
      <div className="tw-w-1"></div>
      <FormGeneric
        formLabel={{ children: "Altura" }}
        formControl={{
          ...{
            type: "number",
          },
          ...{
            value: displayDimension(template.model.sketch.height),
            onChange: async ({ target: { value } }) => {
              await updateTemplate({
                ...template,
                model: {
                  ...template.model,
                  sketch: {
                    ...template.model.sketch,
                    height: +value,
                  },
                },
              });
            },
          },
        }}
        formGroup={{
          controlId: getId("-editor", "-model", "-sketch", "-height"),
        }}
      />
    </div>
  </div>
);
