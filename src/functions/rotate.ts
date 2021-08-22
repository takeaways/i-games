const rotate = document.querySelector("#rotate")! as HTMLDivElement;
const rotateDeg = document.querySelector(".rotate-deg")! as HTMLSpanElement;
const resetButton = rotate.querySelector(".reset")! as HTMLButtonElement;
const rotateButton = rotate.querySelector(".rotate")! as HTMLButtonElement;
const arrow = rotate.querySelector(".fa-arrow-up")! as HTMLElement;

let deg = 0;
let interval: NodeJS.Timer;

const handleRotate = () => {
  rotateButton.disabled = true;
  deg = deg + (deg % 360) + getRandomDeg();
  setDeg(deg);
  interval = setInterval(() => {
    deg = deg + (deg % 360) + getRandomDeg();
    setDeg(deg);
  }, 3200);
};
rotateButton?.addEventListener("click", handleRotate);

resetButton?.addEventListener("click", () => {
  rotateButton.disabled = false;
  setDeg(0);
  clearInterval(interval);
});

function getRandomDeg() {
  return Math.round(Math.random() * 360 * 10);
}

function setDeg(deg: number) {
  rotateDeg.textContent = `${deg}deg`;
  arrow.style.transform = `rotate(${deg}deg)`;
}
