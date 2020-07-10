import EMPTY_IMAGE from "../empty-image";

export const NEW_IMAGE_SAMPLE_1 = {
  arg1: EMPTY_IMAGE,
  options: {
    ...{
      width: 250,
      height: 250,
    },
    ...{
      backgroundColor: "rgba(255, 0, 0, 0.25)",
    },
  },
};

export const NEW_TEXT_SAMPLE_1 = {
  arg1: "Insira algum Texto. Use @qqrcoisa para marcar a parte como editavel.",
  options: { width: 250 },
};
