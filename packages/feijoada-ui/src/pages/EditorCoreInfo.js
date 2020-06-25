import * as React from "react";
import Button from "react-bootstrap/Button";

const stringify = (jsobject) => JSON.stringify(jsobject, null, 2);
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

const EditorCoreInfoJSON = ({ doc }) => (
  <div className="tw-px-1 tw-py-1">
    <textarea
      readOnly
      rows="6"
      className="tw-text-black tw-w-full tw-pl-2 tw-py-1"
      value={stringify(templatePreview({ doc }))}
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
