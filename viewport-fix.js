function setMainHeight() {
  const main = document.querySelector("main");
  if (main) {
    main.style.height = window.innerHeight + "px";
  }
}

window.addEventListener("resize", setMainHeight);
window.addEventListener("orientationchange", setMainHeight);
document.addEventListener("DOMContentLoaded", setMainHeight);
