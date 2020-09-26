import { staticFromURL } from "@fantastic-images/lib/dist/model/static-from-url";
import * as React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const join = (sep) => (...arr) => arr.join(sep);
const BASE_ID = "pages--editor---core---static---footer";
const FILE_INPUT_ID = join("--")(BASE_ID, "-file");

const ActionItemListItem = ({ children, ...props }) => (
  <ListGroup.Item
    className="tw-h-full tw-text-center tw-flex tw-items-center tw-justify-center"
    variant="dark"
    children={children}
    {...props}
  />
);

const ActionItem = ({ children, ...props }) => (
  <div className="tw-w-full tw-h-full" {...props}>
    <ActionItemListItem children={children} />
  </div>
);

const EditorCoreStaticFooter = ({ onStaticImageAdd }) => (
  <div>
    <div>
      <ListGroup>
        <div className="tw-flex">
          <div className="tw-flex-1">
            <ActionItem>
              <label className="tw-mb-0" htmlFor={FILE_INPUT_ID}>
                Adicionar Imagem Estática
              </label>
              <input
                id={FILE_INPUT_ID}
                className="tw-sr-only"
                multiple
                type="file"
                onChange={async ({ target: { files } }) => {
                  await onStaticImageAdd(
                    Array.from(files)
                      .map((blob) => URL.createObjectURL(blob))
                      .map((url) => ({ url }))
                      .map(staticFromURL),
                  );
                }}
              />
            </ActionItem>
          </div>
        </div>
      </ListGroup>
    </div>
  </div>
);
export default EditorCoreStaticFooter;
