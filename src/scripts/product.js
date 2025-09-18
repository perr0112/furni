import { PRODUCT_DATA } from "../data/products";
import { renderOptions } from "./options";
import { $, getAttribute, getSelectedRadio, toggleCart } from "./utils/dom";

const addToCartBtn = $(".details-action .btn");
const priceText = $(".title__price span");
const cartContainer = $(".cart-container");

const requiredOptions = ["color", "model", "material"];

/********/
// Gestion du prix et des options
/********/

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
  return total.toFixed(2);
};

const updatePrice = () => {
    const total = getTotalPrice();
    priceText.innerHTML = total ? total + '€' : "";
}

const updateState = () => {
    let optionsRestantes = getMissingOptions();
    console.log('opt rest', optionsRestantes)

    if (optionsRestantes.length === 0) {
        console.log('vide', addToCartBtn)
        addToCartBtn.classList.remove('disabled')
    }
}

/********/
// Gestion du panier
/********/

const getProductName = () => {
    const el = document.querySelector("[data-name-product]");
    if (!el) return;

    return el.textContent.trim() || "";
};

const addToCart = () => {
    console.log("addToCart called")
    if (addToCartBtn.classList.contains("disabled")) return;

    const item = {
        productName: getProductName(),
        color: getSelectedValue("color"),
        model: getSelectedValue("model"),
        material: getSelectedValue("material"),
        price: getTotalPrice(),
    };

    const key_localstorage = "panier";
    const current = JSON.parse(localStorage.getItem(key_localstorage) || "[]");
    current.push(item);
    localStorage.setItem(key_localstorage, JSON.stringify(current));

    // Reset des options courantes
    requiredOptions.forEach((name) => {
        const sel = getSelectedRadio(name);
        if (sel) sel.checked = false;
    });

    priceText.textContent = "";
    addToCartBtn.classList.add("disabled");

    setTimeout(() => {
        toggleCart(cartContainer, cartContainer.dataset.active === "true")
    }, 100);
};

/* Point d'entrée de la page product */
export function initProductPage() {
  const allOptionsRadio = document.querySelectorAll(
    'input[name="color"], input[name="model"], input[name="material"]'
  );
  if (!allOptionsRadio) return;

  allOptionsRadio.forEach((input) => {
    input.addEventListener("change", () => {
        updatePrice();
        updateState();
    });
  });

  addToCartBtn.addEventListener("click", addToCart);
  updatePrice();
  updateState();
}
