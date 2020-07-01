import * as React from "react";
import * as bsimCore from "@bsim/core";
import FormGeneric from "../components/FormGeneric";

const {
  lib: {
    model: {
      parse: { parseDimension },
    },
  },
} = bsimCore;

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
                        width: parseDimension(value),
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
                        height: parseDimension(value),
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
