import * as React from "react";
import FormGeneric from "../components/FormGeneric";

const getId = (...refs) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");
const displayDimension = (val) => (val === 0 ? "" : val);

const EditorCoreSketch = ({ doc, onSetState }) => (
  <div>
    <div className="tw-flex">
      <FormGeneric
        formLabel={{ text: "Largura" }}
        formControl={{
          props: {
            ...{
              type: "number",
            },
            ...{
              value: displayDimension(doc.model.sketch.width),
              onChange: async ({ target: { value } }) => {
                await onSetState((state) => ({
                  doc: {
                    ...state.doc,
                    model: {
                      ...state.doc.model,
                      sketch: {
                        ...state.doc.model.sketch,
                        width: +value,
                      },
                    },
                  },
                }));
              },
            },
          },
        }}
        formGruop={{
          props: { controlId: getId("-editor", "-model", "-sketch", "-width") },
        }}
      />
      <div className="tw-w-1"></div>

      <FormGeneric
        formLabel={{ text: "Altura" }}
        formControl={{
          props: {
            ...{
              type: "number",
            },
            ...{
              value: displayDimension(doc.model.sketch.height),
              onChange: async ({ target: { value } }) => {
                await onSetState((state) => ({
                  doc: {
                    ...state.doc,
                    model: {
                      ...state.doc.model,
                      sketch: {
                        ...state.doc.model.sketch,
                        height: +value,
                      },
                    },
                  },
                }));
              },
            },
          },
        }}
        formGruop={{
          props: {
            controlId: getId("-editor", "-model", "-sketch", "-height"),
          },
        }}
      />
    </div>
  </div>
);

export default EditorCoreSketch;
