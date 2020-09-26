import { renderTemplate } from "@fantastic-images/core/dist/fabric/render/render-template";
import { fabric } from "fabric";
import cacheB64 from "./cache-b64";

const getPreview = async (template, options) => {
  const {
    model: {
      sketch: { width, height },
    },
  } = template;
  const canvas = new fabric.StaticCanvas(null, { width, height });
  await renderTemplate({ fabric })({ canvas })(template);
  const previewDataURL = canvas.toDataURL(options);
  return await cacheB64(previewDataURL);
};

export default getPreview;
