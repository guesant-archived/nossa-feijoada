import * as React from "react";
import Button from "react-bootstrap/Button";
import optimizeDoc from "../utils/optimize-doc";
import blobAsText from "../utils/blob-as-text";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";

const HomeImportTemplate = ({ updateTemplate, forceRenderFabric }) => (
  <Button
    onClick={() => {
      const input = document.createElement("input");
      input.type = "file";
      input.addEventListener("change", async ({ target: { files } }) => {
        const [file] = files;
        if (file) {
          await new Promise(async (resolve) => {
            try {
              resolve(JSON.parse(await blobAsText(file)));
            } catch (_) {
              resolve(EDITOR_DEFAULT_TEMPLATE);
            }
          }).then(async (template) => {
            await updateTemplate(await optimizeDoc(template));
            await forceRenderFabric();
          });
        }
      });
      input.click();
    }}
    className={["tw-w-full", "tw-mb-0"]}
    children={<span>Abrir Template</span>}
  />
);

export default HomeImportTemplate;
