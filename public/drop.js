//let gameMode = prompt("which sort");
sessionStorage.getItem("val") === null ||
sessionStorage.getItem("alg") === null ||
sessionStorage.getItem("alg") === "Insertion"
  ? (window.location.href = "/")
  : null;

let numArrayValues = parseInt(sessionStorage.getItem("val"));
let gameMode = sessionStorage.getItem("alg");

const swapList = ["Selection", "Bubble", "MaxHeap"];
//Variable instantiation
let docWidth = window.innerWidth;
let docHeight = window.innerHeight;

let ExportedObject;
let domElements = [];
let dragObj;

//window event listeners
window.addEventListener("resize", () => {
  docWidth = window.innerWidth;
  docHeight = window.innerHeight;
});

import("/game_export.js").then((mod) => {
  game_export = mod;
  startGame();
});

//Start function
function startGame() {
  if (!gameMode && !swapList.includes(gameMode)) {
    throw "Game Start Error";
  }

  ExportedObject = new game_export[`${gameMode}Sort`]();
  ExportedObject.generateArray(numArrayValues);
  transferObject(ExportedObject);
}

function transferObject(obj) {
  Composite.remove(world, curCirclePositions);
  for (let i = 0; i < numArrayValues; i++) {
    curCirclePositions[i] = circleElems[obj.positionValues[i] - 1];
  }
  moveOrigin(curCirclePositions, xyPositionsCircle);
}

//function deleteWorldObjects()

const circleIds = [];

function moveOrigin(originArr, posArr) {
  if (originArr.length !== posArr.length) {
    throw `Internal Game Error. ${originArr} ${posArr}`;
  }
  for (let i = 0; i < originArr.length; i++) {
    World.remove(world, originArr[i]);
    Body.translate(originArr[i], {
      x: posArr[i].x - originArr[i].position.x,
      y: posArr[i].y - originArr[i].position.y,
    });
    Body.applyForce(originArr[i], originArr[i].position, {
      x: -originArr[i].force.x,
      y: -originArr[i].force.y,
    });
  }
  World.add(world, originArr);
}

//function createMatter() {
const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Events = Matter.Events,
  MouseConstraint = Matter.MouseConstraint,
  Vertices = Matter.Vertices,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite;

let engine = Engine.create(),
  world = engine.world;

let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: docWidth,
    height: docHeight,
    wireframes: false,
    background: "#FFFFFF",
  },
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
const xyPositionsCircle = [];

for (let i = 0; i < numArrayValues - 1; i++) {
  dividers.push(
    Bodies.rectangle(
      (docWidth / (numArrayValues + 1)) * (i + 1.5),
      docHeight * (1 - contYRatio * 2 - dividerHeight / 2),
      docWidth / 500,
      docHeight * dividerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "#000000",
          lineWidth: 1,
        },
        id: `divider${i}`,
      }
    )
  );
}

for (let i = 0; i < numArrayValues; i++) {
  holderBodies.push(
    Matter.Bodies.rectangle(
      (docWidth / (numArrayValues + 1)) * (i + 1),
      docHeight * (1 - contYRatio),
      docWidth / (numArrayValues + 1),
      docHeight * contYRatio * 2,
      {
        isStatic: true,
        render: {
          fillStyle: "#9F9F9F",
          lineWidth: 1,
        },
        id: `holder${i}`,
      }
    )
  );
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
  let xPos = (docWidth / (numArrayValues + 1)) * (i + 1);
  let yPos = docHeight * 0.2;
  xyPositionsCircle.push({ x: xPos, y: yPos });
  let tempCircle = Bodies.circle(
    xPos,
    yPos,
    docWidth / (numArrayValues + 1) / 4,
    {
      render: {
        sprite: {
          texture: `DropSprites/sprite${i + 1}.png`,
          xScale: (docWidth / (numArrayValues + 1)) * 0.00256,
          yScale: (docWidth / (numArrayValues + 1)) * 0.00256,
        },
      },
      density: 0.005,
      friction: 0.1,
      frictionStatic: 0,
      frictionAir: 0.01,
      restitution: 0.3,
      ground: false,
      id: `circle${i + 1}`,
    }
  );
  circleElems.push(tempCircle);
  curCirclePositions.push(tempCircle);
  circleIds.push(tempCircle.id);

  const middleSpacing = 3 / 8;
  const curDividerExt = [];
  const numExtensions = 5;
  for (let j = 0; j < numExtensions; j++) {
    let curBody;
    if (j % 2 === 0) {
      curBody = Bodies.rectangle(
        (docWidth / (numArrayValues + 1)) * (i + 1) +
          (docWidth / (numArrayValues + 1)) * middleSpacing,
        docHeight *
          (1 -
            contYRatio * 2 -
            (dividerHeight / (numExtensions + 2)) * (j + 2)),
        docWidth / 500,
        (((docWidth / (numArrayValues + 1)) * (0.5 - middleSpacing)) /
          Math.sin(turnAngle)) *
          2,
        {
          isStatic: true,
          render: {
            fillStyle: "transparent",
            lineWidth: 1,
          },
          id: `extension${i}${j}`,
        }
      );
      Body.rotate(curBody, turnAngle);
    } else {
      curBody = Bodies.rectangle(
        (docWidth / (numArrayValues + 1)) * (i + 1) -
          (docWidth / (numArrayValues + 1)) * middleSpacing,
        docHeight *
          (1 -
            contYRatio * 2 -
            (dividerHeight / (numExtensions + 2)) * (j + 2)),
        docWidth / 500,
        (((docWidth / (numArrayValues + 1)) * (0.5 - middleSpacing)) /
          Math.sin(turnAngle)) *
          2,
        {
          isStatic: true,
          render: {
            fillStyle: "transparent",
            lineWidth: 1,
          },
          id: `extension${i}${j}`,
        }
      );
      Body.rotate(curBody, -turnAngle);
    }

    curDividerExt.push(curBody);
  }
  dividerExtensions.push(curDividerExt);
}
dividerExtensions.forEach((x) => World.add(world, x));

World.add(world, curCirclePositions);
World.add(world, holderBodies);
World.add(world, dividers);
const mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
const worldWidth = docWidth / (numArrayValues + 1);
const wallBodies = [
  Bodies.rectangle(0, docHeight / 2, worldWidth, docHeight, {
    isStatic: true,
    render: {
      fillStyle: "transparent",
      lineWidth: 1,
    },
    id: "world",
  }),
  Bodies.rectangle(docWidth, docHeight / 2, worldWidth, docHeight, {
    isStatic: true,
    render: {
      fillStyle: "transparent",
      lineWidth: 1,
    },
    id: "world",
  }),
  Bodies.rectangle(docWidth / 2, 0, docWidth, worldWidth, {
    isStatic: true,
    render: {
      fillStyle: "transparent",
      lineWidth: 1,
    },
    id: "world",
  }),
];

World.add(world, wallBodies);
//}
//createMatter();

Events.on(engine, "collisionStart", (event) => {
  let pairCounted = false;
  event.pairs.forEach((x) => {
    if (x.bodyA.id.includes("circle") && x.bodyB.id.includes("circle")) {
      if (pairCounted) {
        throw "Multiple Circle Collision Error";
      }
      let arrangedArr = [];
      let bodyAIndex = null;
      let bodyBIndex = null;
      for (let i = 0; i < numArrayValues; i++) {
        if (curCirclePositions[i] === x.bodyA) {
          arrangedArr.push(Number(x.bodyB.id.replace("circle", "")));
          bodyAIndex = i;
        } else if (curCirclePositions[i] === x.bodyB) {
          arrangedArr.push(Number(x.bodyA.id.replace("circle", "")));
          bodyBIndex = i;
        } else {
          arrangedArr.push(
            Number(curCirclePositions[i].id.replace("circle", ""))
          );
        }
      }
      pairCounted = true;
      if (ExportedObject.checkSolution(arrangedArr)) {
        let temp = curCirclePositions[bodyAIndex];
        curCirclePositions[bodyAIndex] = curCirclePositions[bodyBIndex];
        curCirclePositions[bodyBIndex] = temp;
        wallBodies[2].render.fillStyle = "#37eb34";
        setTimeout(() => {
          wallBodies[2].render.fillStyle = "transparent";
        }, 500);
      } else {
        wallBodies[2].render.fillStyle = "red";
        setTimeout(() => {
          wallBodies[2].render.fillStyle = "transparent";
        }, 500);
      }
      moveOrigin(
        [curCirclePositions[bodyAIndex], curCirclePositions[bodyBIndex]],
        [xyPositionsCircle[bodyAIndex], xyPositionsCircle[bodyBIndex]]
      );
    }
  });
});
