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
const gameContainerDiv = document.querySelector("#gameContainer");
const messageElem = document.querySelector("#message");
messageElem.style.opacity = 0;
let ExportedObject;
let domElements = [];
let dragObj;

//window event listeners
window.addEventListener("resize", () => {
  docWidth = window.innerWidth;
  docHeight = window.innerHeight;
  createDomElements(ExportedObject.positionValues);
});

function showMessage(message, color) {
  messageElem.style.backgroundColor = color;
  messageElem.textContent = message;
  messageElem.style.opacity = 1;
  setTimeout(() => {
    messageElem.style.opacity = 0;
  }, 1000);
}

//Start function
function startGame() {
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
          ? showMessage("Correct", "#30f000")
          : (showMessage("Incorrect", "red"),
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
