import { StateProp } from "../state";

const REMOVE_OBJECT = ({ idx }: { idx: number }) => ({ doc }: StateProp) => {
  const { model } = doc;
  const { fabricExported } = model;
  const { objects } = fabricExported;
  return {
    doc: {
      ...doc,
      model: {
        ...model,
        fabricExported: {
          ...fabricExported,
          objects: objects.filter((_, filterIdx) => filterIdx !== idx),
        },
      },
    },
  };
};

export default REMOVE_OBJECT;
