const stopScroll = () => {
  scroll.destroy();
};

const enableScroll = () => {
  scroll.start();
};

const enableClick = (element) => {
  element.style.pointerEvents = "auto";
};

const cancelClick = (element) => {
  element.style.pointerEvents = "none";
};

export { stopScroll, enableScroll, enableClick, cancelClick };
