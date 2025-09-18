// pour récupérer les valeurs courantes du localStorage et pour l'appliquer au panier

import { $ } from "./dom";

// const key_localstorage = "panier";

const deleteCartButton = $("[data-delete-cart]")

const CART_KEY = "panier";
const pathToImg = "./assets/img/products/";

const readCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");

function renderCartCount() {
  const length = readCart().length;
  const cartBtnBadge = $("#button-cart p");
  const cartTitle = $(".cart-content h3");
  if (cartBtnBadge) cartBtnBadge.textContent = `Panier (${length})`;
  if (cartTitle) cartTitle.textContent = `Votre panier (${length})`;
}

function renderCartBody() {
  const cartBody = $(".cart-content .content__body");
  if (!cartBody) return;

  const items = readCart();
  console.log("@@@@@@@@@", items)

  cartBody.innerHTML = items.map(({ productName, color, model, material, price }) => `
    <div class="item">
      <div class="item__content">
        <p class="content__title">${productName || "Produit"}</p>
        <div class="content__body">
          <div class="item__img">
            <img src="${pathToImg + color + '.png'}" alt="${productName}" />
          </div>
          <p>Modèle ${model}, ${material}.</p>
        </div>
        <p>${price}€</p>
      </div>
    </div>
  `).join(""); // ","
}

function renderCart() {
  renderCartCount();
  renderCartBody();
}

document.addEventListener("DOMContentLoaded", renderCart);

function initLocalStorage() {
  const setItem = localStorage.setItem.bind(localStorage);
  const CART_KEY = "panier";

  localStorage.setItem = (key, value) => {
    setItem(key, value);
    if (key === CART_KEY) {
      renderCart();
    }
  };
}

initLocalStorage();

if (deleteCartButton) {
  deleteCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("panier");
    if (typeof renderCart === "function") renderCart();
  });
}
