let timeoutId;
function showTerrorEffect() {
  const body = document.body;
  const terrorSound = document.getElementById("terror-sound");

  body.classList.toggle("dark");

  function stopSound() {
    terrorSound.pause();
    terrorSound.currentTime = 0;
    clearTimeout(timeoutId);
  }

  if (body.classList.contains("dark")) {
    terrorSound.currentTime = 0;
    terrorSound.play();
    window.navigator?.vibrate?.(1500);
    timeoutId = setTimeout(stopSound, 3150);
  } else stopSound();
}

function createMagicBackground({
  gridSize = 0,
  rootSize = 0,
  primaryUrl,
  secondaryUrl,
  onClick,
}) {
  function setBoxSize(value) {
    const marginX = value * 0.3;
    root.style.setProperty("--root-size", `${value - marginX}px`);
  }

  function setUrl(url) {
    root.style.setProperty("--bg-url", `url(${url})`);
  }

  const root = document.createElement("div");
  root.style.setProperty("--grid-size", gridSize);
  root.classList.add("background");

  setBoxSize(window.innerWidth <= rootSize ? window.innerWidth : rootSize);
  setUrl(primaryUrl);

  root.addEventListener("click", function () {
    root.classList.toggle("animated");
    const hasSecondary = root.classList.contains("animated") && secondaryUrl;
    setUrl(hasSecondary ? secondaryUrl : primaryUrl);
    onClick?.();
  });

  const boxSize = `var(--root-size) / ${gridSize}`;
  for (let rowId = 0; rowId < gridSize; rowId++) {
    for (let colId = 0; colId < gridSize; colId++) {
      root.innerHTML += `
      <div
        class="background-box"
        style="background-position: calc((${boxSize}) * ${-colId}) calc((${boxSize}) * ${-rowId});">
      </div>`;
    }
  }

  return {
    root,
    onResize: function () {
      setBoxSize(window.innerWidth <= rootSize ? window.innerWidth : rootSize);
    },
  };
}

const component = createMagicBackground({
  gridSize: 4,
  rootSize: 600,
  primaryUrl: "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
  secondaryUrl: "https://media.giphy.com/media/3CIxYBdTB4KjYGtfGC/giphy.gif",
  onClick: showTerrorEffect,
});

document.body.append(component.root);
window.addEventListener("resize", component.onResize);