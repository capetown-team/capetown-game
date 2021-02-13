export enum DirectionType {
  right = 0,
  left = 2,
  up = 3,
  down = 1
}

export class Direction {
  direction: DirectionType;
  angle1: number;
  angle2: number;
  dirX: number;
  dirY: number;

  constructor(
    direction: number,
    angle1: number,
    angle2: number,
    dirX: number,
    dirY: number
  ) {
    this.direction = direction;
    this.angle1 = angle1;
    this.angle2 = angle2;
    this.dirX = dirX;
    this.dirY = dirY;
  }
}
