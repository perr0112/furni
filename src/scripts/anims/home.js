import gsap from "gsap";

import { $, retrieveRootVariables } from "../utils/dom";

import { BASIC_DURATION, primaryEase } from "../../data/constants";

export function initScrollProduct() {
  const productSection = $(".product");
  if (!productSection) return;

  const gridWidthCol = retrieveRootVariables(document.body, "--grid-width-col");
  const gridGap = retrieveRootVariables(document.body, "--grid-gap");
  const finalWidthProduct =
    gridWidthCol.split("p")[0] * 7 + gridGap.split("r")[0] * 8;

  let tl = gsap.timeline({
    defaults: {
      duration: BASIC_DURATION,
      ease: primaryEase,
    },
    scrollTrigger: {
      trigger: productSection,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  tl.to(".product__img img", {
    width: finalWidthProduct,
  });

  tl.to(
    ".product__text div .block",
    {
      width: 0,
    },
    "<"
  );
}
