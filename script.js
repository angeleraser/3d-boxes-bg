const gifUrls = ["https://media.giphy.com/media/8ciNNLBwEfNZrPm9l8/giphy.gif"];

/**
 * @param {{gridSize: number, rootSize: number, gifUrl: string}} config All sizes are in px unit
 */
function createMagicBackground({ gridSize = 0, rootSize = 0, gifUrl = "" }) {
  const root = document.createElement("div");

  function setRootSize(value) {
    const marginX = 60;
    root.style.setProperty("--bg-size", `${value - marginX}px`);
  }

  root.classList.add("background");
  setRootSize(window.innerWidth <= rootSize ? window.innerWidth : rootSize);
  root.style.setProperty("--bg-url", `url(${gifUrl})`);
  root.style.gridTemplateColumns = "1fr ".repeat(gridSize);
  root.addEventListener("click", () => root.classList.toggle("animated"));

  for (let rowId = 0; rowId < gridSize; rowId++) {
    for (let colId = 0; colId < gridSize; colId++) {
      root.innerHTML += `
      <div
        class="background-box"
        style="background-position:
        calc((var(--bg-size) / ${gridSize}) * ${-colId}) 
        calc((var(--bg-size) / ${gridSize}) * ${-rowId});">
      </div>`;
    }
  }

  return {
    root,
    onResize: function () {
      setRootSize(window.innerWidth <= rootSize ? window.innerWidth : rootSize);
    },
  };
}

const component = createMagicBackground({
  gridSize: 4,
  rootSize: 600,
  gifUrl: "https://media.giphy.com/media/8ciNNLBwEfNZrPm9l8/giphy.gif",
});

document.body.append(component.root);
window.addEventListener("resize", component.onResize);
