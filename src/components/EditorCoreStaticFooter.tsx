import { ADD_STATIC_IMAGE } from "@fantastic-images/lib/dist/model/mutations";
import { staticFromURL } from "@fantastic-images/lib/dist/model/static-from-url";
import * as React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Editor } from "../routes/editor";

const ActionItemListItem = ({ ...props }) => (
  <ListGroup.Item
    className="tw-h-full tw-text-center tw-flex tw-items-center tw-justify-center"
    variant="dark"
    {...props}
  />
);

const ActionItem = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="tw-w-full tw-h-full" {...props}>
    <ActionItemListItem style={{ padding: 0 }} children={children} />
  </div>
);

export const EditorCoreStaticFooter = ({
  editor: {
    state: { template },
    updateTemplate,
    reset,
  },
}: {
  editor: Editor;
}) => (
  <div>
    <div>
      <ListGroup>
        <div className="tw-flex">
          <div className="tw-flex-1">
            <ActionItem>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0.75rem 1.25rem",
                }}
                onClick={() => {
                  const input = document.createElement("input");
                  input.addEventListener("change", async ({ target }) => {
                    const { files } = target as typeof input;
                    files &&
                      (await updateTemplate(
                        ADD_STATIC_IMAGE({
                          staticImages: Array.from(files)
                            .map((blob) => URL.createObjectURL(blob))
                            .map((url) => ({ url }))
                            .map(staticFromURL),
                        })(template),
                      ));
                  });
                  input.type = "file";
                  input.multiple = true;
                  input.click();
                }}
                children={<span>Adicionar Imagem Estática</span>}
              />
            </ActionItem>
          </div>
        </div>
      </ListGroup>
    </div>
  </div>
);
