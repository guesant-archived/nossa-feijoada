import imageFromURL from "../image-from-url";
import {
  IBSIMTemplateDoc,
  IBSIMTemplateStatic,
} from "../../../types/IBSIMTemplateDoc";

const buildStatic = ({ fabric }: { fabric: any }) => ({
  doc: { model },
}: {
  doc: IBSIMTemplateDoc;
}) => async ({ url }: { url: IBSIMTemplateStatic["url"] }) => {
  const img = await imageFromURL({ fabric })(url);
  if (img) {
    img.set({ scaleX: model.sketch.width / (img.get("width") || 0) });
    img.set({ scaleY: model.sketch.height / (img.get("height") || 0) });
    img.set("selectable", false);
  }
  return img;
};

export default buildStatic;
