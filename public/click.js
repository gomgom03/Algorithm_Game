//importing files
let game_export;
import('/game_export.js')
    .then((mod) => {
        game_export = mod;
        startGame();
    })

let gameMode = "Insertion";
const sortList = ["Insertion"];
const swapList = ["Selection"];
//Variable instantiation
let docWidth = window.innerWidth;
let docHeight = window.innerHeight;
const gameContainerDiv = document.querySelector('#gameContainer');
let SortObject;
let domElements = [];
let dragObj;

//window event listeners
window.addEventListener('resize', () => {
    docWidth = window.innerWidth;
    docHeight = window.innerHeight;
    createDomElements(SortObject.positionValues);
})

//Start function
function startGame() {
    if(!gameMode||(!sortList.includes(gameMode)||swapList.includes(gameMode))){
        throw "Game Start Error"
    }
    
    SortObject = new game_export[`${gameMode}Sort`]();
    SortObject.generateArray(10);
    createDomElements(SortObject.positionValues);
    if(sortList.includes(gameMode)){
        dragObj = new Draggable.Sortable(gameContainerDiv, {
            draggable: '.sdom',
            mirror: {
                constrainDimensions: true,
                cursorOffsetX: docWidth * 0.8 / domElements.length / 2
            }
        });
    }
    

    dragObj.on('sortable:stop', () => {
        let i = setInterval(() => {
            if (document.querySelectorAll('.draggable-source--is-dragging').length == 0) {
                SortObject.checkSolution([...gameContainerDiv.children].map(x => Number(x.innerText))) ? null : createDomElements(SortObject.positionValues);
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
        tempElem.className = 'sdom';
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




//hello there