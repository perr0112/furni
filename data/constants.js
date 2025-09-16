import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const BASIC_DURATION = 1.2;
const BASIC_DURATION_TIMEOUT = BASIC_DURATION * 250;
const staggerDuration = 0.02;
const TRANSITION_DURATION = 2000;

const primaryEase = CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");

export {
  BASIC_DURATION,
  BASIC_DURATION_TIMEOUT,
  staggerDuration,
  TRANSITION_DURATION,
  primaryEase,
};
