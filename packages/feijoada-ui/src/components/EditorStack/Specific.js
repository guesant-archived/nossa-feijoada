import SpecificTextBox from "./SpecificTextBox";

export const SpecificSupported = ["textbox"];
export const SpecificLabels = {
  textbox: "Estilo do Texto",
};
export const SpecificComponents = {
  textbox: SpecificTextBox,
};

const specificAuto = (obj) => ({ type }) => isSupported({ type }) && obj[type];
export const isSupported = ({ type }) => SpecificSupported.includes(type);
export const specificLabel = specificAuto(SpecificLabels);
export const specificComponent = specificAuto(SpecificComponents);
