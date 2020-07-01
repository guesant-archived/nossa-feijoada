import { StateProp } from "../state";

const REMOVE_STATIC_IMAGE = ({ idx }: { idx: number }) => ({
  doc,
}: StateProp) => {
  const { model } = doc;
  const { staticImages } = model;
  return {
    doc: {
      ...doc,
      model: {
        ...model,
        staticImages: staticImages.filter((_, iidx) => iidx !== idx),
      },
    },
  };
};

export default REMOVE_STATIC_IMAGE;
