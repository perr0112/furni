import { $, getAttribute, hasAttribute } from "./utils/dom";

const previewImg = $(".details-preview img");
const addToCartBtn = $(".details-action .btn");
const priceText = $(".title__price span");
const allOptionsRadio = document.querySelectorAll(
  'input[name="color"], input[name="model"], input[name="material"]'
);

const requiredOptions = ["color", "model", "material"];

const getSelectedValue = (name) => {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  console.log(name, checked);

  return checked ? checked.value : null;
};

const getMissingOptions = () => {
  return requiredOptions.filter((option) => !getSelectedValue(option));
};

const getTotalPrice = () => {
  let total = 0;
  document
    .querySelectorAll('input[type="radio"][data-price]:checked')
    .forEach((el) => {
      total += parseFloat(getAttribute(el, "data-price"));
    });
    console.log(total);
  return total;
};

const updatePrice = () => {
    const total = getTotalPrice();
    priceText.innerHTML = total ? total.toFixed(2) + '€' : "";
}

const updateState = () => {
    let optionsRestantes = getMissingOptions();
    console.log('opt rest', optionsRestantes)

    if (optionsRestantes.length === 0) {
        console.log('vide', addToCartBtn)
        addToCartBtn.classList.remove('disabled')
    }
}

export function initProductPage() {
  if (!allOptionsRadio) return;

  allOptionsRadio.forEach((input) => {
    input.addEventListener("change", () => {
        updatePrice();
        updateState();
    });
  });
}
