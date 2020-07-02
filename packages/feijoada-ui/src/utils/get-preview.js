import { fabric } from "fabric";
import * as bsimCore from "@bsim/core";
import cacheB64 from "./cache-b64";

const {
  fabric: {
    render: { renderTemplate },
  },
} = bsimCore;
const _renderTemplate = renderTemplate({ fabric });

const getPreview = async ({ doc }, options) => {
  const {
    model: {
      sketch: { width, height },
    },
  } = doc;
  const canvas = new fabric.StaticCanvas(null, { width, height });
  await _renderTemplate({ canvas })({ doc })();
  const previewDataURL = canvas.toDataURL(options);
  return await cacheB64(previewDataURL);
};

export default getPreview;
