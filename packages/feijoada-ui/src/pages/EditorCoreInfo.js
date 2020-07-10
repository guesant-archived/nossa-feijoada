import * as React from "react";
import { saveAs } from "file-saver";
import Button from "react-bootstrap/Button";
import blobFromB64 from "../utils/blob-from-b64";
import blobToB64 from "../utils/blob-to-b64";

const stringify = (object, identation = undefined) =>
  JSON.stringify(object, null, identation);
const stringifyFormatted = (object) => stringify(object, 2);

const templatePreview = ({ doc }) => ({
  ...doc,
  model: {
    ...doc.model,
    staticImages: doc.model.staticImages.map(({ position }) => ({
      url: "...",
      position,
    })),
  },
});

const templateExport = async ({ doc }) => ({
  ...doc,
  model: {
    ...doc.model,
    staticImages: await Promise.all(
      doc.model.staticImages.map(async ({ url, ...staticImage }) => ({
        ...staticImage,
        url: await blobFromB64(url).then((blob) => blobToB64(blob)),
      })),
    ),
  },
});

const EditorCoreInfoJSON = ({ doc }) => (
  <div className="tw-px-1 tw-py-1">
    <textarea
      readOnly
      rows="6"
      className="tw-text-black tw-w-full tw-pl-2 tw-py-1"
      value={stringifyFormatted(templatePreview({ doc }))}
      onClick={({ target }) => {
        target.select();
      }}
    ></textarea>
  </div>
);

const EditorCoreInfo = ({ doc }) => {
  const [isJSONVisible, setJSONVisibility] = React.useState(false);
  return (
    <div>
      <div className="tw-px-2 tw-py-2">
        <div className="tw-flex tw-justify-end">
          <Button
            variant="dark"
            onClick={() => {
              templateExport({ doc })
                .then((project) => stringify(project))
                .then(
                  (project) =>
                    new Blob([project], {
                      type: "application/json",
                    }),
                )
                .then((blob) => {
                  saveAs(blob, "template.json");
                });
            }}
          >
            Baixar Template
          </Button>
          <div className="tw-ml-1"></div>
          <Button
            variant={isJSONVisible ? "dark" : "secondary"}
            onClick={() => {
              setJSONVisibility(!isJSONVisible);
            }}
          >
            {isJSONVisible ? "Esconder Template" : "Mostrar Template"}
          </Button>
        </div>
      </div>
      <div>{isJSONVisible && <EditorCoreInfoJSON doc={doc} />}</div>
    </div>
  );
};
export default EditorCoreInfo;
