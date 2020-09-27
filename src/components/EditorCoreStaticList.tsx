import {
  REMOVE_STATIC_IMAGE,
  UPDATE_STATIC_IMAGE,
} from "@fantastic-images/lib/dist/model/mutations";
import * as React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Editor } from "../routes/editor";
import { arrRotate } from "./arr-rotate";

const getNextPosition = arrRotate(["front", "back"])(1);

export const EditorCoreStaticList = ({
  editor: {
    state: { template },
    updateTemplate,
  },
}: {
  editor: Editor;
}) => (
  <div>
    <ListGroup>
      {template.model.staticImages.map((i, idx, arr) => (
        <ListGroup.Item key={idx} className="tw-text-black">
          <div className="tw-flex tw-items-center">
            <span>
              Imagem #
              {String(idx + 1).padStart(String(arr.length).length + 1, "0")}
            </span>
            <span className="tw-mx-1">-</span>
            <button
              onClick={async (e) => {
                e.preventDefault();
                URL.revokeObjectURL(i.url);
                await updateTemplate(
                  REMOVE_STATIC_IMAGE({ idx: [idx] })(template),
                );
              }}
              children={<span>Remover</span>}
            />
          </div>
          <div>
            <label
              children={
                <>
                  <input
                    type="checkbox"
                    checked={i.position === "front"}
                    onChange={async () => {
                      await updateTemplate(
                        UPDATE_STATIC_IMAGE(idx, {
                          ...i,
                          position: getNextPosition(i.position),
                        })(template),
                      );
                    }}
                    className="tw-mr-1"
                  />
                  <span>Ao topo</span>
                </>
              }
            />
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);
