//Variable instantiation

let docWidth = window.innerWidth;
let docHeight = window.innerHeight;
const gameContainerDiv = document.querySelector('#gameContainer');


let game_export;
import('/game_export.js')
    .then((mod) => {
        game_export = mod;
        startGame();
    })

let ISObject;
let domElements = [];
let sortable;
function startGame() {
    ISObject = new game_export.InsertionSort();
    ISObject.generateArray(10);
    //console.log(ISObject.positionValues, ISObject.solution, ISObject.solutionLength)
    createDomElements(ISObject.positionValues);

    sortable = new Draggable.Sortable(gameContainerDiv, {
        draggable: '.ssdom',
        mirror: {
            constrainDimensions: true,
            cursorOffsetX: docWidth * 0.8 / domElements.length / 2
        }
    });

    sortable.on('sortable:stop', () => {
        let i = setInterval(() => {
            if (document.querySelectorAll('.draggable-source--is-dragging').length == 0) {
                ISObject.checkSolution([...gameContainerDiv.children].map(x => Number(x.innerText))) ? null : createDomElements(ISObject.positionValues);
                clearInterval(i);
            }
        }, 10)
    });


}



function createDomElements(pvs) {
    while (gameContainerDiv.lastChild) {
        gameContainerDiv.removeChild(gameContainerDiv.lastChild);
    }
    domElements = [];
    for (let i = 0; i < pvs.length; i++) {
        let tempElem = document.createElement('div');
        tempElem.innerText = pvs[i];
        tempElem.className = 'ssdom';
        tempElem.draggable = true;
        gameContainerDiv.appendChild(tempElem);
        tempElem.style.width = tempElem.style.height = docWidth * 0.8 / pvs.length + 'px';
        domElements.push(tempElem);
    }
    if (JSON.stringify(domElements.map(x => Number(x.innerText))) !== JSON.stringify(pvs)) {
        throw "Something Went Wrong?", { l: JSON.stringify(domElements.map(x => Number(x.innerText))), r: JSON.stringify(pvs) }
    }
    //now code the thing that verifies the next move is the same and clear and redraw if it aint.
}

window.addEventListener('resize', () => {
    docWidth = window.innerWidth;
    docHeight = window.innerHeight;
    createDomElements(ISObject.positionValues);
})
