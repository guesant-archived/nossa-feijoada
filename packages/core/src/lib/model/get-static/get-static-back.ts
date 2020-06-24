import { IBSIMTemplateStatic } from "../../../../types/IBSIMTemplateDoc";

const getStaticBack = (staticImages: IBSIMTemplateStatic[]) =>
  staticImages.filter(({ position }) => position === "back");

export default getStaticBack;
