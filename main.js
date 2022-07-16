const canvas = document.getElementById('mycanvas');
canvas.style = 'border-style: solid';

const ctx = canvas.getContext('2d');


data = {
  cubeInitPos: {
    x: 5, y: 5,
  },
  boardDim: { // probably redundant
    width: 12, height: 5,
  },
  board: [
    "       #### ",
    "  ###  #### ",
    "    ### ### ",
    "    # ##### ",
    "    #  #####"
  ],
};

const level = new Level(data);
const cube = level.cube;

console.log(level.board);

const cubeW = 15;
const cubeH = 15;

function drawBoard() {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  for (let i = 0; i < level.boardDim.width; ++i) {
    for (let j = 0; j < level.boardDim.height; ++j) {
      ctx.fillText(level.board[i][j],
        cubeW * i + 4,
        cubeH * j + 12);
    }
  }
}

function drawCube() {
  ctx.beginPath();
  ctx.rect(
    cubeW * cube.pos.x,
    cubeH * cube.pos.y,
    cubeW,
    cubeH);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillText(cube.faceVal.U,
    cubeW * cube.pos.x + 4,
    cubeH * cube.pos.y + 12);
}


document.addEventListener('keydown', (ev) => {
  const name = ev.key;
  //const code = ev.code;
  //console.log(`Key press: ${name}, code: ${code}`);

  switch(name) {
    case 'ArrowLeft':
      cube.RollLeft();
      break;
    case 'ArrowRight':
      cube.RollRight();
      break;
    case 'ArrowUp':
      cube.RollBack();
      break;
    case 'ArrowDown':
      cube.RollFront();
      break;
  }
}, false);


function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBoard();
    drawCube();
  }, 500);
};

animate();
