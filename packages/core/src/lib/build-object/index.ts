import { IBSIMTemplateSupportedObjects } from "../../../types/IBSIMTemplateDoc";

const buildObject = ({ fabric }: { fabric: any }) => ({
  object,
}: {
  object: any;
}): Promise<IBSIMTemplateSupportedObjects> =>
  new Promise((resolve) => {
    switch (object.type) {
      case "image":
        return fabric.Image.fromObject(object, resolve);
      case "textbox":
        return fabric.Textbox.fromObject(object, resolve);
      default:
        return resolve(undefined);
    }
  });

export default buildObject;
