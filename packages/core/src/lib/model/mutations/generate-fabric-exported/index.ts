import { StateProp } from "../state";
import { IBSIMTemplateExportedObject } from "../../../../../types/IBSIMTemplateDoc";

const GENERATE_FABRIC_EXPORTED = ({
  objects,
}: {
  objects: IBSIMTemplateExportedObject[];
}) => ({ doc }: StateProp) => ({
  doc: {
    ...doc,
    model: {
      ...doc.model,
      fabricExported: {
        ...doc.model.fabricExported,
        objects,
      },
    },
  },
});

export default GENERATE_FABRIC_EXPORTED;
