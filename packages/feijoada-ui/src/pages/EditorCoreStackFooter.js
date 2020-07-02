import * as React from "react";
import { fabric } from "fabric";
import * as bsimCore from "@bsim/core";
import ListGroup from "react-bootstrap/ListGroup";
import {
  NEW_TEXT_SAMPLE_1,
  NEW_IMAGE_SAMPLE_1,
} from "../utils/Editor/stack-samples";
const {
  lib: { imageFromURL },
} = bsimCore;

const FooterButton = ({ children, ...props }) => (
  <button className="tw-w-full tw-h-full" {...props}>
    <ListGroup.Item
      className="tw-h-full tw-text-center tw-flex tw-items-center tw-justify-center"
      variant="dark"
      children={children}
    />
  </button>
);

const newImg = ((_imageFromURL) => async ({ arg1, options }) => {
  return await _imageFromURL(arg1, options);
})(imageFromURL({ fabric }));

const newText = async ({ arg1, options }) => {
  return new fabric.Textbox(arg1, options);
};

const EditorCoreStackListFooter = ({ onAddObject }) => (
  <div>
    <ListGroup>
      <div className="tw-flex">
        <div className="tw-flex-1">
          <FooterButton
            onClick={async () => {
              await onAddObject(await newImg(NEW_IMAGE_SAMPLE_1));
            }}
          >
            Adicionar Imagem
          </FooterButton>
        </div>
        <div className="tw-flex-1">
          <FooterButton
            onClick={async () => {
              await onAddObject(await newText(NEW_TEXT_SAMPLE_1));
            }}
          >
            Adicionar Texto
          </FooterButton>
        </div>
      </div>
    </ListGroup>
  </div>
);

export default EditorCoreStackListFooter;
