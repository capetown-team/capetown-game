// type Props = {
//   name: string;
//   angle1: number;
//   angle2: number;
//   dirX: number;
//   dirY: number;
// };

export class Direction {
  // name: string;
  direction: number;
  angle1: number;
  angle2: number;
  dirX: number;
  dirY: number;

  // constructor({ name, angle1, angle2, dirX, dirY }: Props) {
  //   this.name = name;
  //   this.angle1 = angle1;
  //   this.angle2 = angle2;
  //   this.dirX = dirX;
  //   this.dirY = dirY;
  // }

  constructor(
    // name: string,
    direction: number,
    angle1: number,
    angle2: number,
    dirX: number,
    dirY: number
  ) {
    // this.name = name;
    this.direction = direction;
    this.angle1 = angle1;
    this.angle2 = angle2;
    this.dirX = dirX;
    this.dirY = dirY;
  }
}
