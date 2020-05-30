sessionStorage.getItem("val") === null || sessionStorage.getItem("alg") === null
  ? (window.location.href = "/")
  : null;

let numArrayValues = parseInt(sessionStorage.getItem("val"));
let gameMode = sessionStorage.getItem("alg");

import("/game_export.js").then((mod) => {
  game_export = mod;
  startGame();
});

const sortList = ["Insertion"];
const swapList = ["Selection", "Bubble", "MaxHeap"];
//Variable instantiation
let docWidth = window.innerWidth;
let docHeight = window.innerHeight;
let gameContainerDiv = document.querySelector("#gameContainer");
const messageElem = document.querySelector("#message");
document.querySelector("#sortType").textContent = `Sort Type: ${gameMode}`

let ExportedObject;
let domElements = [];
let dragObj;
let time;
let tempTimeout;

//window event listeners
window.addEventListener("resize", () => {
  docWidth = window.innerWidth;
  docHeight = window.innerHeight;
  createDomElements(ExportedObject.positionValues);
});

function showMessage(message, color, option) {
  messageElem.style.backgroundColor = color;
  messageElem.textContent = message;
  messageElem.style.opacity = 1;
  let optionType = typeof option;
  optionType === "function"
    ? option()
    : optionType === "number"
      ? tempTimeout = setTimeout(() => {
        messageElem.style.opacity = 0;
      }, 1000)
      : null;
}

//Start function
function startGame() {
  messageElem.style.opacity = 0;
  time = Date.now();
  if (
    !gameMode ||
    (!sortList.includes(gameMode) && !swapList.includes(gameMode))
  ) {
    throw "Game Start Error";
  }

  ExportedObject = new game_export[`${gameMode}Sort`]();
  ExportedObject.generateArray(numArrayValues);
  createDomElements(ExportedObject.positionValues);

  if (sortList.includes(gameMode)) {
    dragObj = new Draggable.Sortable(gameContainerDiv, {
      draggable: ".sdom",
      mirror: {
        constrainDimensions: true,
        cursorOffsetX: (docWidth * 0.8) / domElements.length / 2,
      },
    });
    dragObj.on("sortable:stop", () => {
      dragEndFunc();
    });
  } else {
    dragObj = new Draggable.Swappable(gameContainerDiv, {
      draggable: ".sdom",
      mirror: {
        constrainDimensions: true,
        cursorOffsetX: (docWidth * 0.8) / domElements.length / 2,
      },
    });
    dragObj.on("swappable:stop", () => {
      dragEndFunc();
    });
  }

  function dragEndFunc() {
    let i = setInterval(() => {
      if (
        document.querySelectorAll(".draggable-source--is-dragging").length == 0
      ) {
        ExportedObject.checkSolution(
          [...gameContainerDiv.children].map((x) => Number(x.innerText))
        )
          ? ExportedObject.solutionStep !== ExportedObject.solutionLength
            ? showMessage("Correct", "#30f000", 1000)
            : showMessage(
              `You're done! It took ${
              Math.round((Date.now() - time) / 10) / 100
              } seconds to solve. Click this to play again.`,
              "#828282",
              () => {
                clearTimeout(tempTimeout)
                messageElem.addEventListener("click", startOver);
                function startOver() {
                  messageElem.removeEventListener("click", startOver);
                  console.log("called");
                  let replDiv = gameContainerDiv.cloneNode(true);
                  gameContainerDiv.parentNode.replaceChild(replDiv, gameContainerDiv);
                  gameContainerDiv = replDiv;
                  startGame();
                }
              }
            )
          : (showMessage("Incorrect", "red", 1000),
            createDomElements(ExportedObject.positionValues));
        clearInterval(i);
      }
    }, 10);
  }
}

function createDomElements(pvs) {
  while (gameContainerDiv.lastChild) {
    gameContainerDiv.removeChild(gameContainerDiv.lastChild);
  }
  domElements = [];
  for (let i = 0; i < pvs.length; i++) {
    let tempElem = document.createElement("div");
    tempElem.innerText = pvs[i];
    tempElem.className = "sdom";
    tempElem.draggable = true;
    gameContainerDiv.appendChild(tempElem);
    tempElem.style.width = tempElem.style.height =
      (docWidth * 0.8) / pvs.length + "px";
    domElements.push(tempElem);
  }
  if (
    JSON.stringify(domElements.map((x) => Number(x.innerText))) !==
    JSON.stringify(pvs)
  ) {
    throw (
      ("Something Went Wrong?",
      {
        l: JSON.stringify(domElements.map((x) => Number(x.innerText))),
        r: JSON.stringify(pvs),
      })
    );
  }
  //now code the thing that verifies the next move is the same and clear and redraw if it aint.
}

//hello there
