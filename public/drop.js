//importing files
let socket = io();
let game_export;
import('/game_export.js')
    .then((mod) => {
        game_export = mod;
        startGame();
    })

window.decomp = require('poly-decomp');
const Matter = require('matter-js/build/matter.js');
//let gameMode = prompt("which sort");
let numArrayValues = 10;
let gameMode = "MaxHeap";
const sortList = ["Insertion"];
const swapList = ["Selection", "Bubble", "MaxHeap"];
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
})

//Start function
function startGame() {
    if (!gameMode || (!sortList.includes(gameMode) && !swapList.includes(gameMode))) {
        throw "Game Start Error"
    }

    ExportedObject = new game_export[`${gameMode}Sort`]();
    ExportedObject.generateArray(numArrayValues);

    if (sortList.includes(gameMode)) {

    } else {

    }

}

function createMatter() {
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint,
        Vertices = Matter.Vertices,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    let engine = Engine.create(),
        world = engine.world;

    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: docWidth,
            height: docHeight,
            wireframes: false,
            background: '#FFFFFF'
        }
    });

    Render.run(render);

    let runner = Runner.create();
    Runner.run(runner, engine);

    let containerBodies = Bodies.fromVertices(0,0,Vertices.fromPath(`0 0 0 ${docHeight/5} ${docWidth/numArrayValues/1.1} ${docHeight/5}`),{
        render: {
            fillStyle: 'blue',
            strokeStyle: 'blue',
            lineWidth: 1
        }
    })

    World.add(world, containerBodies,
        Bodies.circle(docWidth/2, docHeight/2, 10, {
            render: {
                strokeStyle: '#000000',
                fillStyle: 'transparent',
                lineWidth: 1
            }
        })
    );
    /*
    let collider = Bodies.rectangle(400, 300, 500, 50, {
        isSensor: true,
        isStatic: true,
        render: {
            strokeStyle: '#FF0000',
            fillStyle: 'transparent',
            lineWidth: 1
        }
    });



    */
    World.add(world, [
        Bodies.rectangle(docWidth/2, docHeight, docWidth, docHeight*0.1, { 
            isStatic: true,
            render: {
                fillStyle: '#000000',
                lineWidth: 1
            }
        })
    ]);
}
createMatter();





