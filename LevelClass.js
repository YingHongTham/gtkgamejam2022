if (typeof(POSITION_STUFF) === undefined) {
  console.error('expect positionStuff.js');
}

if (typeof(Cube) === undefined) {
  console.error('expect CubeClass.js');
}

const ALIVE = 0;
const DEATH = 1;

/*
 *  data = {
 *    cubeInitPos: {
 *      x: , y: ,
 *    },
 *    boardDim: {
 *      width: 13, height: 7,
 *    },
 *    board: [
 *      "             ",
 *      "       ####  ",
 *      "  ###  ####  ",
 *      "    ### ###  ",
 *      "    # #####  ",
 *      "    #  ##### ",
 *      "             ",
 *    ],
 *  }
 *
 * meaning of board:
 *  (blank): fall off and die
 * #: normal board position
 */
Level = function(data) {
  this.cube = new Cube(data.cubeInitPos);
  this.boardDim = data.boardDim;
  this.board = Array(data.boardDim.width);
  for (let i = 0; i < data.boardDim.width; ++i) {
    this.board[i] = Array(data.boardDim.height).fill(' ');
  }
  for (let i = 0; i < data.boardDim.width; ++i) {
    for (let j = 0; j < data.boardDim.height; ++j) {
      this.board[i][j] = data.board[j][i];
    }
  }
  
  this.state = ALIVE;
};

Level.prototype.Move = function(direction) {
  const numSteps = this.cube.faceVal.U;
  for (let i = 0; i < numSteps; ++i) {
    let state = this.MoveOneStep(direction);
    if (state === DEATH) {
      this.state = DEATH;
      return;
    }
  }
};

Level.prototype.MoveOneStep = function(direction) {
  const newPos = ADD_VECTORS(this.cube.pos, UNIT_VECTOR[direction]);
  if (this.board[newPos.x][newPos.y] === ' ') {
    this.cube.RollNormal(direction);
    //this.cube.FallToDeath();
    //this.Death();
    return DEATH;
  }
  if (this.board[newPos.x][newPos.y] === '#') {
    this.cube.RollNormal(direction);
    return ALIVE;
  }
};
