import { IBSIMTemplateExportedObject } from "../../../../../types/IBSIMTemplateDoc";
import { StateProp } from "../state";

const UPDATE_OBJECT = (idx: number, updated: IBSIMTemplateExportedObject) => ({
  doc,
}: StateProp) => {
  const { model } = doc;
  const { fabricExported } = model;
  const { objects } = fabricExported;
  const before = objects.slice(0, idx);
  const after = objects.slice(idx + 1);
  return {
    doc: {
      ...doc,
      model: {
        ...model,
        fabricExported: {
          ...fabricExported,
          objects: [...before, updated, ...after],
        },
      },
    },
  };
};

export default UPDATE_OBJECT;
