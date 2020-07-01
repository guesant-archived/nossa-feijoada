import { fabric as fabricTypes } from "fabric";

export type IBSIMTemplateSupportedObjects =
  | fabricTypes.Image
  | fabricTypes.Textbox;

export interface IBSIMTemplateStatic {
  url: string;
  position: "back" | "front";
}

export type IBSIMTemplateExportedObject = [{ [key: string]: any }];

export interface IBSIMTemplateExported {
  version?: string;
  objects: IBSIMTemplateExportedObject[];
}

export interface IBSIMTemplateDoc {
  description: string;
  publisher: string;
  model: {
    sketch: {
      width: number;
      height: number;
    };
    staticImages: IBSIMTemplateStatic[];
    fabricExported: IBSIMTemplateExported;
  };
}
