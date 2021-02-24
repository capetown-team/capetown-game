import { DirectionType } from '@game/script/helpers/constants';

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
