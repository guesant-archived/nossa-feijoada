import { renderTemplate } from "@fantastic-images/core/dist/fabric/render/render-template";
import { Template } from "@fantastic-images/types";
import { fabric } from "fabric";
import { Canvas, IDataURLOptions } from "fabric/fabric-impl";
import { cacheB64 } from "./cache-b64";

export const getPreview = async (
  template: Template,
  options: IDataURLOptions,
) => {
  const {
    model: {
      sketch: { width, height },
    },
  } = template;

  const canvas = new fabric.StaticCanvas(null, { width, height }) as Canvas;
  await renderTemplate({ fabric })({ canvas })(template);
  const previewImage = canvas.toDataURL(options);
  return await cacheB64(previewImage);
};
