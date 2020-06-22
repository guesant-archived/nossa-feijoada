import * as React from "react";
import FormGeneric from "../components/FormGeneric";
import parseDimensionInput from "../utils/bsim-utils/parse-dimension-input";

const getId = (...refs) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");

const EditorCoreSketch = ({ doc, onSetState }) => (
  <div>
    <div className="tw-flex">
      <FormGeneric
        formLabel={{ text: "Largura" }}
        formControl={{
          props: {
            ...{
              placeholder: "350",
              type: "number",
            },
            ...{
              value: doc.model.sketch.width,
              onChange: async ({ target: { value } }) => {
                await onSetState((state) => ({
                  doc: {
                    ...state.doc,
                    model: {
                      ...state.doc.model,
                      sketch: {
                        ...state.doc.model.sketch,
                        width: parseDimensionInput(value),
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
              placeholder: "400",
              type: "number",
            },
            ...{
              value: doc.model.sketch.height,
              onChange: async ({ target: { value } }) => {
                await onSetState((state) => ({
                  doc: {
                    ...state.doc,
                    model: {
                      ...state.doc.model,
                      sketch: {
                        ...state.doc.model.sketch,
                        height: parseDimensionInput(value),
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
