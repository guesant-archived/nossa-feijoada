import cacheB64 from "./cache-b64";

const optimizeDoc = async (doc) => ({
  ...doc,
  model: {
    ...doc.model,
    staticImages: await Promise.all(
      doc.model.staticImages.map(async ({ url, ...rest }) => ({
        ...rest,
        url: await cacheB64(url),
      })),
    ),
  },
});

export default optimizeDoc;
