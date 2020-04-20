//importing files
let socket = io();
let game_export;
import('/game_export.js')
    .then((mod) => {
        game_export = mod;
        startGame();
    })

//let gameMode = prompt("which sort");
let numArrayValues = 10;
let gameMode = "Selection";
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
    if (!gameMode && !swapList.includes(gameMode)) {
        throw "Game Start Error"
    }

    ExportedObject = new game_export[`${gameMode}Sort`]();
    ExportedObject.generateArray(numArrayValues);
    transferObject(ExportedObject)

}

function transferObject(obj){
    console.log(obj.positionValues);
    for(let i = 0; i<numArrayValues;i++){
        console.log(obj.positionValues[i],circleElems[obj.positionValues[i]-1])
        curCirclePositions[i] = circleElems[obj.positionValues[i]-1];
    }
    World.add(world, curCirclePositions);
    //////////////////////////WORK ON GAME LOGIC, initial positions should match the coordinates at first render, maybe make function.
}

const circleIds = [];




//function createMatter() {
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint,
        Vertices = Matter.Vertices,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body;

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

    const dividers = [];
    const dividerHeight = 0.7;

    const contYRatio = 0.05;
    const turnAngle = 1.1;
    const holderBodies = [];
    const circleElems = [];
    const curCirclePositions = [];
    const dividerExtensions = [];
    
    for(let i = 0; i<numArrayValues-1;i++){
        dividers.push(Bodies.rectangle(docWidth/(numArrayValues+1)*(i+1.5), docHeight*(1-contYRatio*2-dividerHeight/2), docWidth/500, docHeight*dividerHeight, {
            isStatic: true,
            render: {
                fillStyle: '#000000',
                lineWidth: 1
            }
        }));
        
    }

    for (let i = 0; i < numArrayValues; i++) {
        holderBodies.push(Matter.Bodies.rectangle(docWidth/(numArrayValues+1)*(i+1),docHeight*(1-contYRatio), docWidth/(numArrayValues+1),docHeight*contYRatio*2,{
            isStatic: true,
            render: {
                fillStyle: '#9F9F9F',
                lineWidth: 1
            }
        }));
        /*
        holderBodies.push(Bodies.fromVertices(docWidth / (numArrayValues + 1) * (i + 1), docHeight * 0.95, Vertices.fromPath(`${-docWidth / contXRatio} ${docHeight / contYRatio} ${-docWidth / contXRatio} 0 ${docWidth / contXRatio} 0 ${docWidth / contXRatio} ${docHeight / contYRatio} ${docWidth / contXInner} ${docHeight / contYRatio} ${docWidth / contXInner} ${docHeight / contYInner} ${-docWidth / contXInner} ${docHeight / contYInner} ${-docWidth / contXInner} ${docHeight / contYRatio}`), {
            render: {
                fillStyle: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                strokeStyle: '#000000',
                lineWidth: 1,
            },
            id: `holder${i + 1}`
        }));
        */
        let tempCircle = Bodies.circle(docWidth / (numArrayValues + 1) * (i + 1), docHeight * 0.2, docWidth / (numArrayValues + 1) / 4, {
            render: {
                sprite: {
                    texture: `DropSprites/sprite${i + 1}.png`,
                    xScale: docWidth / (numArrayValues + 1) * 0.00256,
                    yScale: docWidth / (numArrayValues + 1) * 0.00256
                }
            },
            density: 0.005,
            friction: 0.1,
            frictionStatic: 0,
            frictionAir: 0.01,
            restitution: 0.3,
            ground: false,
            id: `circle${i + 1}`
        })
        circleElems.push(tempCircle);
        curCirclePositions.push(tempCircle);
        circleIds.push(tempCircle.id);
        
        const middleSpacing = 3/10;
        const curDividerExt = [];
        const numExtensions = 5;
        for(let j = 0; j<numExtensions ;j++){
            let curBody;
            if(j%2===0){
                curBody = Bodies.rectangle(docWidth/(numArrayValues+1)*(i+1)+docWidth/(numArrayValues+1)*middleSpacing, docHeight*(1-contYRatio*2-dividerHeight/(numExtensions+2)*(j+2)), docWidth/500, docWidth/(numArrayValues+1)*(0.5-middleSpacing)/Math.sin(turnAngle)*2, {
                    isStatic: true,
                    render: {
                        fillStyle: 'transparent',
                        lineWidth: 1
                    },
                    id: `extension${i}${j}`
                })
                Body.rotate(curBody,turnAngle)
            } else{
                curBody = Bodies.rectangle(docWidth/(numArrayValues+1)*(i+1)-docWidth/(numArrayValues+1)*middleSpacing, docHeight*(1-contYRatio*2-dividerHeight/(numExtensions+2)*(j+2)), docWidth/500, docWidth/(numArrayValues+1)*(0.5-middleSpacing)/Math.sin(turnAngle)*2, {
                    isStatic: true,
                    render: {
                        fillStyle: 'transparent',
                        lineWidth: 1
                    },
                    id: `extension${i}${j}`
                })
                Body.rotate(curBody,-turnAngle)
            }
            
            curDividerExt.push(curBody);
        }
        dividerExtensions.push(curDividerExt)
    }
    dividerExtensions.forEach(x=>World.add(world, x));
    


    //World.add(world, curCirclePositions);
    World.add(world,holderBodies);
    World.add(world, dividers)
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    const worldWidth = docWidth / (numArrayValues + 1);
    const wallBodies = [
        Bodies.rectangle(0, docHeight / 2, worldWidth, docHeight, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                lineWidth: 1
            },
            id: 'world'
        }),
        Bodies.rectangle(docWidth, docHeight / 2, worldWidth, docHeight, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                lineWidth: 1
            },
            id: 'world'
        }),
        Bodies.rectangle(docWidth / 2, 0, docWidth, worldWidth, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                lineWidth: 1
            },
            id: 'world'
        }),
    ]


    World.add(world, wallBodies);
//}
//createMatter();





