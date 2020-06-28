const hasProperty = (obj) => (index) =>
  Object.prototype.hasOwnProperty(obj, index);

export const SpecificLabels = {
};
export const SpecificComponents = {
};

const objectIncludes = (obj) => ({ type }) => hasProperty(obj, type);
const specificAuto = (obj) => ({ type }) => isSupported({ type }) && obj[type];
export const isSupported = objectIncludes(SpecificSupported);
export const specificLabel = specificAuto(SpecificLabels);
export const specificComponent = specificAuto(SpecificComponents);
