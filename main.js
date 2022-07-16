const canvas = document.getElementById('mycanvas');
canvas.style = 'border-style: solid';

const ctx = canvas.getContext('2d');


const cube = new Cube();

const cubeW = 15;
const cubeH = 15;

function drawCube() {
  ctx.fillText(cube.faceVal.U,
    cubeW * cube.pos.x + 4,
    cubeH * cube.pos.y + 12);
  ctx.strokeRect(
    cubeW * cube.pos.x,
    cubeH * cube.pos.y,
    cubeW,
    cubeH);
}


document.addEventListener('keydown', (ev) => {
  const name = ev.key;
  const code = ev.code;
  console.log(`Key press: ${name}, code: ${code}`);

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
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCube();
  }, 500);
};

animate();
