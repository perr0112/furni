import Lenis from "lenis";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";

import { $, retrieveRootVariables } from "./scripts/utils/dom.js";
import { initScrollProduct } from "./scripts/anims/home.js";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");

function initVariables() {
  const gridCol = $(".col-span-1") || "8O";
  const gridGapWidth = retrieveRootVariables(document.body, "--global-padding");
  const gridColWidth = gridCol.offsetWidth;

  document.body.style.setProperty("--grid-width-col", `${gridColWidth}px`);
  document.body.style.setProperty("--grid-gap", gridGapWidth);
}

function initTitlesWithNumber() {
  const titlesWithAfter = document.querySelectorAll('h1[data-title-after]')
  titlesWithAfter.forEach((title) => {
    const value = title.dataset.value;
    console.log('===', value)
  })

  console.log(titlesWithAfter)
}

function initDom() {
  initVariables();
  initTitlesWithNumber();
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

function initFunctions() {
  initDom();
  initScrollProduct();
  initLenis();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("dom content loaded");
  initFunctions();
});
