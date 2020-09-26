import * as React from "react";
import FormGeneric from "../components/FormGeneric";

const getId = (...refs) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");
const displayDimension = (val) => (val === 0 ? "" : val);

const EditorCoreSketch = ({
  state: { template },
  updateTemplate,
  forceRenderFabric,
}) => (
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
                await forceRenderFabric();
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
                await forceRenderFabric();
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
