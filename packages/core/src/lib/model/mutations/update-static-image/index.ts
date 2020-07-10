import { IBSIMTemplateStatic } from "../../../../../types/IBSIMTemplateDoc";
import { StateProp } from "../state";

const UPDATE_STATIC_IMAGE = (idx: number, updated: IBSIMTemplateStatic) => ({
  doc,
}: StateProp) => {
  const { model } = doc;
  const { staticImages } = model;
  const before = staticImages.slice(0, idx);
  const after = staticImages.slice(idx + 1);
  return {
    doc: {
      ...doc,
      model: {
        ...model,
        staticImages: [...before, updated, ...after],
      },
    },
  };
};

export default UPDATE_STATIC_IMAGE;
