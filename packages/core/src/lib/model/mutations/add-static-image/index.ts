import { StateProp } from "../state";
import { IBSIMTemplateStatic } from "../../../../../types/IBSIMTemplateDoc";

const ADD_STATIC_IMAGE = ({
  staticImages,
}: {
  staticImages: IBSIMTemplateStatic[];
}) => ({ doc }: StateProp): StateProp => ({
  doc: {
    ...doc,
    model: {
      ...doc.model,
      staticImages: [...doc.model.staticImages, ...staticImages],
    },
  },
});

export default ADD_STATIC_IMAGE;
