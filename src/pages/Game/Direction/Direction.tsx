export class Direction {
  direction: number;
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
