let resizeTimer;
assignWindowHeight();

window.addEventListener("resize", () => {
  assignWindowHeight();
  console.log("Resized");
});

function assignWindowHeight() {
  let windowHeight = document.documentElement.clientHeight;
  console.log("windowHeight = " + windowHeight);
  console.log("windowWidth = " + window.innerWidth);
  document.documentElement.style.setProperty(
    "--windowHeight",
    `${windowHeight}px`
  );
}
