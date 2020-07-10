import * as React from "react";
import Button from "react-bootstrap/Button";
import optimizeDoc from "../utils/optimize-doc";
import blobAsText from "../utils/blob-as-text";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";

const HomeImportTemplate = ({ buttonProps = {}, onUpdateDoc }) => (
  <Button
    {...buttonProps}
    className={[buttonProps.className || "", "tw-mb-0"]}
    as="label"
  >
    <span>Abrir Template</span>
    <input
      type="file"
      className="tw-sr-only"
      onChange={async ({
        target: {
          files: [file],
        },
      }) => {
        if (!file) return;
        try {
          await onUpdateDoc(
            await optimizeDoc(JSON.parse(await blobAsText(file))),
          );
        } catch (_) {
          await onUpdateDoc(await optimizeDoc(EDITOR_DEFAULT_TEMPLATE));
        }
      }}
    />
  </Button>
);

export default HomeImportTemplate;
