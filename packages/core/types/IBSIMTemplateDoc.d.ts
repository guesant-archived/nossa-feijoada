export interface IBSIMTemplateStatic {
  url: string;
  position: "back" | "front";
}

export interface IBSIMTemplateExported {
  version?: string;
  objects: [{ [key: string]: any }];
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
