import gsap from "gsap";

import { $ } from "./dom";

import { BASIC_DURATION } from "../../data/constants";

export function toggleGrid() {
  const grid = $(".grid.markers");
  if (!grid) return;

  const isHidden = grid.dataset.hidden === "true";
  grid.dataset.hidden = !isHidden;

  gsap.to("div.markers div", {
    scaleY: isHidden ? 1 : 0,
    duration: BASIC_DURATION,
    stagger: 0.02,
    ease: "primary-ease",
    overwrite: "auto",
    onStart: () => {
      gsap.set("div.markers div", { willChange: "transform" });
    },
  });
}
