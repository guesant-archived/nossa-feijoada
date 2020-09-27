import { Template } from "@fantastic-images/types";
import { saveAs } from "file-saver";
import * as React from "react";
import Button from "react-bootstrap/Button";
import { blobFromURL } from "../helpers/blob-from-url";
import { blobToURL } from "../helpers/blob-to-url";
import { Editor } from "../routes/editor";

const stringify = (object: any, identation: number | undefined = undefined) =>
  JSON.stringify(object, null, identation);

const stringifyFormatted = (object: any) => stringify(object, 2);

const templatePreview = (template: Template) => ({
  ...template,
  model: {
    ...template.model,
    staticImages: template.model.staticImages.map(({ position }) => ({
      url: "...",
      position,
    })),
  },
});

const templateExport = async (template: Template) => ({
  ...template,
  model: {
    ...template.model,
    staticImages: await Promise.all(
      template.model.staticImages.map(async ({ url, ...staticImage }) => ({
        ...staticImage,
        url: await blobFromURL(url).then((blob) => blobToURL(blob)),
      })),
    ),
  },
});

const EditorCoreInfoJSON = ({ template }: { template: Template }) => (
  <div className="tw-px-1 tw-py-1">
    <textarea
      readOnly
      rows={6}
      className="tw-text-black tw-w-full tw-pl-2 tw-py-1"
      value={stringifyFormatted(templatePreview(template))}
      onDoubleClick={({ target }) => {
        (target as HTMLTextAreaElement).select();
      }}
      onFocus={({ target }) => {
        (target as HTMLTextAreaElement).select();
      }}
    ></textarea>
  </div>
);

export const EditorCoreInfo = ({
  editor: {
    state: { template },
  },
}: {
  editor: Editor;
}) => {
  const [isJSONVisible, setJSONVisibility] = React.useState(false);
  return (
    <div>
      <div className="tw-px-2 tw-py-2">
        <div className="tw-flex tw-justify-end">
          <Button
            variant="dark"
            onClick={() => {
              templateExport(template)
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
      <div
        children={isJSONVisible && <EditorCoreInfoJSON template={template} />}
      />
    </div>
  );
};
