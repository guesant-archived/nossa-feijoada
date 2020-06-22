import * as React from "react";
import FormGeneric from "../components/FormGeneric";

const getId = (...refs) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");

const EditorCoreDoc = ({ doc, onSetState }) => (
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
            value: doc.description,
            onChange: async ({ target: { value: description } }) => {
              await onSetState((state) => ({
                doc: {
                  ...state.doc,
                  description,
                },
              }));
            },
          },
        },
      }}
      formGruop={{
        props: { controlId: getId("-editor", "-model", "-description") },
      }}
    />

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
            value: doc.publisher,
            onChange: async ({ target: { value: publisher } }) =>
              await onSetState((state) => ({
                doc: {
                  ...state.doc,
                  publisher,
                },
              })),
          },
        },
      }}
      formGruop={{
        props: { controlId: getId("-editor", "-model", "-publisher") },
      }}
    />
  </div>
);

export default EditorCoreDoc;
