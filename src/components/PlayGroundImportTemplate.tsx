import { Template } from "@fantastic-images/types";
import * as React from "react";
import Button from "react-bootstrap/Button";
import { blobAsText } from "../helpers/blob-as-text";
import { DEFAULT_TEMPLATE } from "../helpers/default-template";
import { optimizeDoc } from "../helpers/optimize-doc";
import { PlayGroundExtendProps } from "../routes/playground/extend-playground";

export const PlayGroundImportTemplate = ({
  updateTemplate,
}: PlayGroundExtendProps) => (
  <Button
    onClick={() => {
      const input = document.createElement("input");
      input.type = "file";
      input.addEventListener("change", async ({ target }) => {
        const [file] = (target as HTMLInputElement).files ?? [];
        if (file) {
          const readTemplate = (): Promise<Template> =>
            new Promise(async (resolve) => {
              try {
                resolve(JSON.parse(await blobAsText(file)));
              } catch (_) {}
              resolve(DEFAULT_TEMPLATE);
            });
          await readTemplate().then(async (template: Template) =>
            updateTemplate(await optimizeDoc(template)),
          );
        }
      });
      input.click();
    }}
    className="tw-w-full tw-mb-0"
    children={<span>Abrir Template</span>}
  />
);
