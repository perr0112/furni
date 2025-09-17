import { products } from "../../data/products";
import { $ } from "../utils/dom";

const pathToImg = "./assets/img/products/";

function createCard(data) {
  if (!data) return;
  const { name, price, img, available } = data;

  const productAvailable = `
    <a class="btn secondary">Voir le produit</a>
    <a class="btn primary">Ajouter au panier</a>
  `

  const productNotAvailable = `
    <p class="btn primary disabled">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="7" stroke="white"/>
            <line x1="13.0987" y1="2.59525" x2="2.49207" y2="13.2019" stroke="white"/>
        </svg>
        Indisponible
    </a>
  `

  const cardH = `
    <div class="card-product col-span-4 s-col-span-4">
        <div class="card-product-cover" data-available=${available}>
            <div class="card-product__title">
                <p>${name}</p>
                <span>${price}</span>
            </div>
            <img src=${pathToImg + img + '.png'} alt=${name} class="cover__img" />
            <div class="card-product__actions">
                ${available ? (
                    productAvailable
                ) : (
                    productNotAvailable
                )}
            </div>
        </div>
    </div>
  `

  return cardH;
}

export function initCards() {
  const dataGridCards = $("[data-cards]");
  if (!dataGridCards) return;

  const emptyCol = document.createElement("div");
  emptyCol.classList = "col-span-1 s-col-none";

  products.forEach((product, i) => {
    const res = createCard(product);

    dataGridCards.innerHTML += res
  });
}
