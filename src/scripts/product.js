import gsap from "gsap";
import { BASIC_DURATION } from "../data/constants";
import { $, getAttribute, getSelectedRadio, toggleCart } from "./utils/dom";
import { cancelClick, enableClick } from "./utils/actions";

const addToCartBtn = $(".details-action .btn");
const priceText = $(".title__price span");
const cartContainer = $(".cart-container");
const imgProduct = $("[data-product-img]");

const requiredOptions = ["color", "model", "material"];

/********/
// Gestion du prix et des options
/********/

const getSelectedValue = (name) => {
  const checked = document.querySelector(`input[name="${name}"]:checked`);

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
  return total.toFixed(2);
};

const updatePrice = () => {
  const total = getTotalPrice();
  priceText.innerHTML = total ? total + "€" : "";
};

const updateState = () => {
  let optionsRestantes = getMissingOptions();

  if (optionsRestantes.length === 0) {
    addToCartBtn.classList.remove("disabled");
  }
};

/********/
// Gestion du panier
/********/

const getProductName = () => {
  const el = document.querySelector("[data-name-product]");
  if (!el) return;

  return el.textContent.trim() || "";
};

const addToCart = () => {
  if (addToCartBtn.classList.contains("disabled")) return;

  const item = {
    id: String(Date.now()),
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
    toggleCart(cartContainer, cartContainer.dataset.active === "true");
  }, 100);
};

function updateImg(input) {
  if (getAttribute(input, "name") !== "color") return;

  cancelClick(document.body);

  const next = getAttribute(input, "value");
  if (!imgProduct || !next) return;

  const url = `./assets/img/details/${next}.png`;
  if (imgProduct.src.endsWith(url)) return;

  gsap.to(imgProduct, {
    opacity: 0.6,
    ease: "primary-ease",
    duration: BASIC_DURATION,
    onComplete: () => {
      imgProduct.addEventListener(
        "load",
        () => {
          imgProduct.style.opacity = 0.6;
        },
        { once: true }
      );
      imgProduct.src = url;
    },
  });

  gsap.to(
    imgProduct,
    {
      opacity: 1,
      onComplete: () => {
        enableClick(document.body)
      }
    },
    ">"
  );
}

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
      updateImg(input);
    });
  });

  addToCartBtn.addEventListener("click", addToCart);
  updatePrice();
  updateState();
}
