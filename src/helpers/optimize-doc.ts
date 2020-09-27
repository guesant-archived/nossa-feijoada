import { Template } from "@fantastic-images/types";
import { cacheB64 } from "./cache-b64";

export const optimizeDoc = async (template: Template) => ({
  ...template,
  model: {
    ...template.model,
    staticImages: await Promise.all(
      template.model.staticImages.map(async ({ url, ...rest }) => ({
        ...rest,
        url: await cacheB64(url),
      })),
    ),
  },
});
