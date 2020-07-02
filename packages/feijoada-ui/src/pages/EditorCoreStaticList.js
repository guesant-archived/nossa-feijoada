import * as React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import arrRotate from "../utils/arr-rotate";

const getNextPosition = arrRotate(["front", "back"])(1);
const EditorCoreStaticList = ({
  staticImages,
  onStaticImageUpdate,
  onStaticImageRemove,
}) => (
  <div>
    <ListGroup>
      {staticImages.map((i, idx, arr) => (
        <ListGroup.Item key={idx} className="tw-text-black">
          <div className="tw-flex tw-items-center">
            <p>
              Imagem #
              {String(idx + 1).padStart(String(arr.length).length + 1, "0")}
            </p>
            <span className="tw-mx-1">-</span>
            <button
              onClick={async (e) => {
                e.preventDefault();
                await onStaticImageRemove(idx);
              }}
            >
              Remover
            </button>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={i.position === "front"}
                onChange={async () => {
                  await onStaticImageUpdate(idx, {
                    ...i,
                    position: getNextPosition(i.position),
                  });
                }}
                className="tw-mr-1"
              />
              <span>No topo sempre</span>
            </label>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default EditorCoreStaticList;
