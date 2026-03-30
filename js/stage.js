const zone = document.getElementById("interactionZone");
const curtains = document.getElementById("curtains");
const enterBtn = document.getElementById("enterBtn");

zone.addEventListener("mouseenter", () => {
  curtains.classList.add("open");
  enterBtn.classList.add("visible");
});

zone.addEventListener("mouseleave", () => {
  curtains.classList.remove("open");
  enterBtn.classList.remove("visible");
});
