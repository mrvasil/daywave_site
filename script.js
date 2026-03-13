const page = document.querySelector(".page");
const tiltCard = document.querySelector("[data-tilt-card]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

if (page && canHover.matches) {
  const setPointerPosition = (x, y) => {
    page.style.setProperty("--pointer-x", `${x}px`);
    page.style.setProperty("--pointer-y", `${y}px`);
  };

  setPointerPosition(window.innerWidth / 2, window.innerHeight / 2);

  window.addEventListener(
    "pointermove",
    (event) => {
      setPointerPosition(event.clientX, event.clientY);
    },
    { passive: true }
  );
}

if (tiltCard && canHover.matches && !prefersReducedMotion.matches) {
  const updateTilt = (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX / bounds.width) - 0.5) * 10;
    const rotateX = (0.5 - (offsetY / bounds.height)) * 8;

    tiltCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    tiltCard.style.setProperty("--card-x", `${offsetX}px`);
    tiltCard.style.setProperty("--card-y", `${offsetY}px`);
  };

  const resetTilt = () => {
    tiltCard.style.transform = "";
  };

  tiltCard.addEventListener("pointerenter", updateTilt);
  tiltCard.addEventListener("pointermove", updateTilt);
  tiltCard.addEventListener("pointerleave", resetTilt);

  tiltCard.style.setProperty("--card-x", "50%");
  tiltCard.style.setProperty("--card-y", "50%");
  resetTilt();
}
