import { IBSIMTemplateExportedObject } from "../../../../../types/IBSIMTemplateDoc";
import { StateProp } from "../state";

const ADD_OBJECT = ({ object }: { object: IBSIMTemplateExportedObject }) => ({
  doc,
}: StateProp): StateProp => ({
  doc: {
    ...doc,
    model: {
      ...doc.model,
      fabricExported: {
        ...doc.model.fabricExported,
        objects: [...doc.model.fabricExported.objects, object],
      },
    },
  },
});

export default ADD_OBJECT;
