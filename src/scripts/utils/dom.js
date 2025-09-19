export const retrieveRootVariables = (element, variable) => {
  if (!element || !variable) return;
  return window.getComputedStyle(element).getPropertyValue(variable);
};

export const $ = (element) => {
  return document.querySelector(element);
};

export const getAttribute = (element, attribute = "name") => {
  return element.getAttribute(attribute);
};

export const hasAttribute = (element, attribute = "name") => {
  return element.hasAttribute(attribute);
};

export const getSelectedRadio = (name) => {
  return document.querySelector(`input[name="${name}"]:checked`);
};

export const toggleActive = (element, state) => {
  element.dataset.active = !state;
};
