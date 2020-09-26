import * as React from "react";
import FormGeneric from "../components/FormGeneric";

const getId = (...refs) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");

const EditorCoreDoc = ({ state: { template }, updateTemplate, onSetState }) => (
  <div>
    <FormGeneric
      formLabel={{ text: "Descrição" }}
      formControl={{
        props: {
          ...{
            placeholder: "Descreva Seu Template",
            type: "text",
          },
          ...{
            value: template.description,
            onChange: async ({ target: { value: description } }) => {
              await updateTemplate({
                ...template,
                description,
              });
            },
          },
        },
      }}
      formGruop={{
        props: {
          className: "tw-mb-0",
          controlId: getId("-editor", "-model", "-description"),
        },
      }}
    />
    <div className="tw-mb-2"></div>
    <FormGeneric
      formLabel={{ text: "Remetente" }}
      formControl={{
        props: {
          ...{
            placeholder: "Remetente do template",
            type: "text",
          },
          ...{
            disabled: true,
            readOnly: true,
            value: template.publisher,
            onChange: async ({ target: { value: publisher } }) => {
              await updateTemplate({
                ...template,
                publisher,
              });
            },
          },
        },
      }}
      formGruop={{
        props: {
          className: "tw-mb-0",
          controlId: getId("-editor", "-model", "-publisher"),
        },
      }}
    />
    <div className="tw-mb-2"></div>
  </div>
);

export default EditorCoreDoc;
