const POSITION_STUFF = '';


const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;


const UNIT_VECTOR = [
  {
    x: 1,
    y: 0,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: -1,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
];

function L_VECTOR(l, direction) {
  return {
    x: l * UNIT_VECTOR[direction].x,
    y: l * UNIT_VECTOR[direction].y,
  };
}

function ADD_VECTORS(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}
