import * as React from "react";
import { Editor } from "../routes/editor";
import { FormGeneric } from "./FormGeneric";

const getId = (...refs: string[]) =>
  ["pages", "editor", "-core", "-doc", ...refs].join("--");

export const EditorCoreDoc = ({
  editor: {
    updateTemplate,
    state: { template },
  },
}: {
  editor: Editor;
}) => (
  <div>
    <FormGeneric
      formLabel={{ children: "Descrição" }}
      formControl={{
        ...{
          placeholder: "Descreva Seu Template",
          type: "text",
        },
        ...{
          value: template.meta?.description,
          onChange: async ({ target: { value: description } }) => {
            await updateTemplate({
              ...template,
              meta: {
                ...template.meta,
                description,
              },
            });
          },
        },
      }}
      formGroup={{
        className: "tw-mb-0",
        controlId: getId("-editor", "-model", "-description"),
      }}
    />
    <div className="tw-mb-2" />
    <FormGeneric
      formLabel={{ children: "Remetente" }}
      formControl={{
        ...{
          placeholder: "Remetente do template",
          type: "text",
        },
        ...{
          disabled: true,
          readOnly: true,
          value: template.meta?.publisher,
          onChange: async ({ target: { value: publisher } }) => {
            await updateTemplate({
              ...template,
              meta: {
                ...template.meta,
                publisher,
              },
            });
          },
        },
      }}
      formGroup={{
        className: "tw-mb-0",
        controlId: getId("-editor", "-model", "-publisher"),
      }}
    />
    <div className="tw-mb-2" />
  </div>
);
