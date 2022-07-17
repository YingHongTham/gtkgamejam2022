// +y is going down, following canvas

if (typeof(POSITION_STUFF) === undefined) {
  console.error('expect positionStuff.js');
}

Cube = function(initPos, ctx) {
  this.ctx = ctx; // context of canvas on which to draw
  this.cubeW = 15;
  this.cubeH = 15;

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
    x: initPos.x,
    y: initPos.y,
  };

  this.animationQueue = [];
};

Cube.prototype.SetPos = function(x, y) {
  this.pos.x = x;
  this.pos.y = y;
};

Cube.prototype.RollWithAnimation = function(direction, curTime) {
  let startTime = curTime;
  if (this.animationQueue.length > 0) {
    startTime = this.animationQueue[this.animationQueue.length-1].endTime;
  }
  this.animationQueue.push({
    startTime: startTime,
    endTime: startTime + 500,
    direction: direction,
  });
};

Cube.prototype.Rotate = function(direction) {
  switch(direction) {
    case EAST:
      this.RotateEast();
      return;
    case NORTH:
      this.RotateNorth();
      return;
    case WEST:
      this.RotateWest();
      return;
    case SOUTH:
      this.RotateSouth();
      return;
    default:
      console.error('bad direction value');
  }
}

Cube.prototype.RollNormal = function(direction) {
  switch(direction) {
    case EAST:
      this.RollRight();
      return;
    case NORTH:
      this.RollBack();
      return;
    case WEST:
      this.RollLeft();
      return;
    case SOUTH:
      this.RollFront();
      return;
    default:
      console.error('bad direction value');
  }
}

Cube.prototype.RollLeft = function() {
  this.RotateWest();
  this.pos.x -= 1;
};
Cube.prototype.RotateWest = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.R;
  this.faceVal.R = this.faceVal.D;
  this.faceVal.D = this.faceVal.L;
  this.faceVal.L = x;
};

Cube.prototype.RollRight = function() {
  this.RotateEast();
  this.pos.x += 1;
};
Cube.prototype.RotateEast = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.L;
  this.faceVal.L = this.faceVal.D;
  this.faceVal.D = this.faceVal.R;
  this.faceVal.R = x;
};

Cube.prototype.RollFront = function() {
  this.RotateSouth();
  this.pos.y += 1;
};
Cube.prototype.RollFront = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.B;
  this.faceVal.B = this.faceVal.D;
  this.faceVal.D = this.faceVal.F;
  this.faceVal.F = x;
};

Cube.prototype.RollBack = function() {
  this.RotateNorth();
  this.pos.y -= 1;
};
Cube.prototype.RotateNorth = function() {
  let x = this.faceVal.U;
  this.faceVal.U = this.faceVal.F;
  this.faceVal.F = this.faceVal.D;
  this.faceVal.D = this.faceVal.B;
  this.faceVal.B = x;
};

Cube.prototype.FallToDeath = function() {
};


Cube.prototype.DrawCube = function(curTime) {
  let pos = { x: this.pos.x, y: this.pos.y };

  // incorporate animation
  if (this.animationQueue.length > 0) {
    let animation = this.animationQueue[0];
    let unitVec = UNIT_VECTOR[animation.direction];
    if (curTime > animation.endTime) {
      // animation complete, set final position
      this.pos = ADD_VECTORS(pos, unitVec);
      pos = this.pos;
      // and rotate to see correct face
      this.Rotate(animation.direction);
      // and remove animation
      this.animationQueue.shift();
    }
    else {
      let scale = Math.sin(Math.PI*0.001*(curTime - animation.startTime));
      pos.x += unitVec.x * scale;
      pos.y += unitVec.y * scale;
    }
  }

  this.DrawCubeAtPos(pos);
};

Cube.prototype.DrawCubeAtPos = function(pos) {
  ctx.beginPath();
  ctx.rect(
    cubeW * pos.x,
    cubeH * pos.y,
    cubeW,
    cubeH);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillText(this.faceVal.U,
    cubeW * pos.x + 4,
    cubeH * pos.y + 12);
};


/*
 *  animData = { // maybe this is too complicated
 *    startTime: ,
 *    duration: ,
 *    transformation: (delta) => {
 *      transformation to be applied to starting state
 *    },
 *  }
 *
 */
Cube.prototype.AddAnimation = function(animData) {
};
