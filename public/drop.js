//importing files
let socket = io();
let game_export;
import('/game_export.js')
    .then((mod) => {
        game_export = mod;
        startGame();
    })

//let gameMode = prompt("which sort");
let gameMode = "MaxHeap";
const sortList = ["Insertion"];
const swapList = ["Selection", "Bubble","MaxHeap"];
//Variable instantiation
let docWidth = window.innerWidth;
let docHeight = window.innerHeight;

let ExportedObject;
let domElements = [];
let dragObj;

//window event listeners
window.addEventListener('resize', () => {
    docWidth = window.innerWidth;
    docHeight = window.innerHeight;
    createDomElements(ExportedObject.positionValues);
})

//Start function
function startGame() {
    if(!gameMode||(!sortList.includes(gameMode)&&!swapList.includes(gameMode))){
        throw "Game Start Error"
    }

    ExportedObject = new game_export[`${gameMode}Sort`]();
    ExportedObject.generateArray(10);

    if(sortList.includes(gameMode)){
        
    }else{
        
    }
    
    

}







