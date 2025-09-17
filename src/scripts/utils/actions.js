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

const customCursor = (element, type) => {
  element.style.cursor = type;
}

export { stopScroll, enableScroll, enableClick, cancelClick, customCursor };
