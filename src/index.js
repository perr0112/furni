import Lenis from "lenis";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";

import { $, retrieveRootVariables, toggleActive } from "./scripts/utils/dom.js";
import { initScrollProduct } from "./scripts/anims/home.js";
import { initCards } from "./scripts/components/card.js";
import { toggleGrid } from "./scripts/utils/grid.js";
import { initProductPage } from "./scripts/product.js";

import "./scripts/utils/localStorage.js";
import { renderOptions } from "./scripts/options.js";
import { PRODUCT_DATA } from "./data/products.js";

let scroll;

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");

function initVariables() {
  const gridCol = $(".col-whitespace") || 80;
  const gridGapWidth = retrieveRootVariables(document.body, "--global-padding");
  const gridColWidth = gridCol.offsetWidth;

  document.body.style.setProperty("--grid-width-col", `${gridColWidth}px`);
  document.body.style.setProperty("--grid-gap", gridGapWidth);
}

function initDom() {
  initVariables();
}

function initLenis() {
  scroll = new Lenis({
    duration: 1,
  });

  scroll.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    scroll.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function initCart() {
  const buttonCart = $("#button-cart");
  const cartContainer = $(".cart-container");

  if (!buttonCart) return;

  buttonCart.addEventListener("click", () => {
    // customCursor(document.body, "wait");
    // scroll.stop();

    // cartContainer.dataset.active = cartContainer.dataset.active === "true" ? false : true;
    toggleActive(cartContainer, cartContainer.dataset.active === "true")
  });

  cartContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target === cartContainer) {
      toggleActive(cartContainer, cartContainer.dataset.active  === "true")
    }
  })
}

function initFunctions() {
  initDom();
  initScrollProduct();
  initLenis();
  initCart();

  if (location.pathname === "/products") {
    initCards();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("dom content loaded");
  initFunctions();

  if (document.querySelector(".details")) {
      renderOptions(PRODUCT_DATA);
      initProductPage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key.toLowerCase() === "g") {
    toggleGrid();
  }
});
