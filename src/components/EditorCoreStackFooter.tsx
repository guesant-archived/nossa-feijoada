import { imageFromURL } from "@fantastic-images/lib/dist/image-from-url";
import { ADD_OBJECT } from "@fantastic-images/lib/dist/model/mutations/add-object";
import { fabric } from "fabric";
import { IImageOptions, ITextboxOptions, Object } from "fabric/fabric-impl";
import * as React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { RED_IMAGE } from "../helpers/red-image";
import { Editor } from "../routes/editor";

const NEW_IMAGE_SAMPLE_1: [string, IImageOptions] = [
  RED_IMAGE,
  {
    ...{
      top: 10,
      left: 10,
      width: 250,
      height: 250,
    },
  },
];

const NEW_TEXT_SAMPLE_1: [string, ITextboxOptions] = [
  "TextBox",
  { top: 10, left: 10 },
];

const FooterButton = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => (
  <button className="tw-w-full tw-h-full" {...props}>
    <ListGroup.Item
      className="tw-h-full tw-text-center tw-flex tw-items-center tw-justify-center"
      variant="dark"
      children={children}
    />
  </button>
);

const newImg = (url: string, options?: IImageOptions) =>
  imageFromURL({ fabric })(url, options);

const newText = async (text: string, options?: ITextboxOptions) =>
  new fabric.Textbox(text, options);

export const EditorCoreStackFooter = ({
  editor: {
    updateTemplate,
    state: { template },
  },
}: {
  editor: Editor;
}) => {
  const addObject = (object: Object) =>
    updateTemplate(ADD_OBJECT({ object: object.toObject() })(template));
  return (
    <div>
      <ListGroup>
        <div className="tw-flex">
          <div className="tw-flex-1">
            <FooterButton
              onClick={async () => {
                await addObject(await newImg(...NEW_IMAGE_SAMPLE_1));
              }}
              children={<span>Adicionar Imagem</span>}
            />
          </div>
          <div className="tw-flex-1">
            <FooterButton
              onClick={async () => {
                await addObject(await newText(...NEW_TEXT_SAMPLE_1));
              }}
              children={<span>Adicionar Texto</span>}
            />
          </div>
        </div>
      </ListGroup>
    </div>
  );
};
