export const retrieveRootVariables = (element, variable) => {
  if (!element || !variable) return;
  return window.getComputedStyle(element).getPropertyValue(variable);
};

export const $ = (element) => {
  return document.querySelector(element);
};
