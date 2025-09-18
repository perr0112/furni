// pour récupérer les valeurs courantes du localStorage et pour l'appliquer au panier

import { $ } from "./dom";

// const key_localstorage = "panier";

const deleteCartButton = $("[data-delete-cart]");

const CART_KEY = "panier";
const pathToImg = "./assets/img/details/";

const readCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const cartBody = $(".cart-content .content__body");

function renderCartCount() {
  const length = readCart().length;
  const cartBtnBadge = $("#button-cart p");
  const cartTitle = $(".cart-content h3");
  if (cartBtnBadge) cartBtnBadge.textContent = `Panier (${length})`;
  if (cartTitle) cartTitle.textContent = `Votre panier (${length})`;
}

function renderCartBody() {
  if (!cartBody) return;

  const items = readCart();

  cartBody.innerHTML = items
    .map(
      ({ id, productName, color, model, material, price }) => `
  <div class="item">
    <div class="item__content">
      <div class="item__img">
        <img src="${pathToImg + color + ".png"}" alt="${productName}" />
      </div>
      <div class="item__body">
        <div class="body__details">
          <div>
            <p class="content__title">${productName || "Produit"}</p>
            <p>Modèle ${model.toUpperCase()} en ${color}</p>
            <p>En ${material}</p>
          </div>
          <p data-delete-product data-id="${id}">Supprimer</p>
        </div>
        <div class="body__price">
          <p>${price}€</p>
        </div>
      </div>
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

if (cartBody) {
  cartBody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete-product]");
    if (!btn) return;

    const id = btn.dataset.id;
    const items = readCart().filter((it) => String(it.id) !== String(id));

    localStorage.setItem(CART_KEY, JSON.stringify(items));
  });
}
