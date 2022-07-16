Cube = function() {
  // face values
  this.faceVal = {
    U: 1, // up (top)
    L: 2, // left
    F: 3, // front
    D: 7, // down (bottom)
    R: 6, // right
    B: 5, // back
  }

  this.pos = {
    x: 0,
    y: 0,
  };
};

Cube.prototype.RollLeft = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.R;
  this.faceVal.R = this.faceVal.D;
  this.faceVal.D = this.faceVal.L;
  this.faceVal.L = x;

  this.pos.x -= 1;
}

Cube.prototype.RollRight = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.L;
  this.faceVal.L = this.faceVal.D;
  this.faceVal.D = this.faceVal.R;
  this.faceVal.R = x;

  this.pos.x += 1;
}

Cube.prototype.RollFront = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.B;
  this.faceVal.B = this.faceVal.D;
  this.faceVal.D = this.faceVal.F;
  this.faceVal.F = x;

  this.pos.y -= 1;
}

Cube.prototype.RollBack = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.F;
  this.faceVal.F = this.faceVal.D;
  this.faceVal.D = this.faceVal.B;
  this.faceVal.B = x;

  this.pos.y += 1;
}

