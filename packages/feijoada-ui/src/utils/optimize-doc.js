import cacheB64 from "./cache-b64";

const optimizeDoc = async (template) => ({
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

export default optimizeDoc;
