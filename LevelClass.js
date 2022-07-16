/*
 *  data = {
 *    cubeInitPos: {
 *      x: , y: ,
 *    },
 *    boardDim: {
 *      width: 12, height: 5,
 *    },
 *    board: [
 *      "       #### ",
 *      "  ###  #### ",
 *      "    ### ### ",
 *      "    # ##### ",
 *      "    #  #### "
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
};
