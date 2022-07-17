const canvas = document.getElementById('mycanvas');
canvas.style = 'border-style: solid';

const ctx = canvas.getContext('2d');


data = {
  cubeInitPos: {
    x: 5, y: 5,
  },
  boardDim: { // probably redundant
    width: 13, height: 7,
  },
  board: [
    "             ",
    "       ####  ",
    "  ###  ####  ",
    " ##########  ",
    "    # #####  ",
    "    ######## ",
    "             ",
  ],
};

const level = new Level(data, ctx);
const cube = level.cube;

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

  if (level.state === DEATH) {
    ctx.fillText('Dead', 100, 100);
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

let curTime = 0;

document.addEventListener('keydown', (ev) => {
  if (level.state === DEATH) {
    return;
  }
  const name = ev.key;
  const code = ev.code;
  console.log(`Key press: ${name}, code: ${code}`);

  let direction = 0;
  if (name === 'ArrowLeft') {
    direction = WEST;
  }
  else if (name === 'ArrowRight') {
    direction = EAST;
  }
  else if (name === 'ArrowUp') {
    direction = NORTH;
  }
  else if (name === 'ArrowDown') {
    direction = SOUTH;
  }
  else {
    direction = -1;
  }
  if (direction in [EAST, NORTH, WEST, SOUTH]) {
    level.Move(direction, curTime);
  }
}, false);


let continueAnimate = false;;

function animate(time) {
  if (!continueAnimate)
    return;
  requestAnimationFrame(animate);

  curTime = time;

  // clear canvas
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  //ctx.clearRect(0,0,canvas.width,canvas.height);

  drawBoard();
  cube.DrawCube(time);
};

function startAnim() {
  continueAnimate = true;
  animate();
}

function pauseAnim() {
  continueAnimate = false;
}

startAnim();




const playAnimBtn = document.getElementById('playAnim');
const pauseAnimBtn = document.getElementById('pauseAnim');

playAnimBtn.onclick = () => { startAnim(); };
pauseAnimBtn.onclick = () => { pauseAnim(); };
