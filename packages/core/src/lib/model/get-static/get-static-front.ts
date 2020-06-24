import { IBSIMTemplateStatic } from "../../../../types/IBSIMTemplateDoc";

const getStaticFront = (staticImages: IBSIMTemplateStatic[]) =>
  staticImages.filter(({ position }) => position === "front");

export default getStaticFront;
