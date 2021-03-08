import {
  right,
  left,
  up,
  down,
  between,
  toPixelPos
} from '@game/script/helpers/action';
import { step } from '@game/script/helpers/constants';
import { InitParameters } from '@game/script/Types';
import { DirectionWatch } from '@game/script/Direction/DirectionWatch';
import { Direction } from './Direction/Direction';

type Map = { posY: { row: number; posX: { col: number; type: string }[] }[] };

export class moveClass {
  initParameters: InitParameters;
  directionWatcher = new DirectionWatch();
  direction = up.direction;

  radius = 20;
  posX = 0;
  posY = 0;
  dirX = up.dirX;
  dirY = up.dirY;
  angle1 = up.angle1;
  angle2 = up.angle2;

  map: Map = { posY: [] };
  row: number;
  col: number;

  speed = 1;
  stepMounth = 12;
  isMouthOpen = false;
  frozen = true;
  score = 0;
  isCheckPill = true;
  isCheckBonus = true;
  isCheckGhost = true;
  isCheckCross = true;

  constructor(initParameters: InitParameters, map: Map) {
    this.initParameters = initParameters;
    this.row = 0;
    this.col = 0;

    this.startPosition();
    this.setMap(map);
  }

  getRandomInt(min: number, max: number) {
    console.log(this);
    const min1 = Math.ceil(min);
    const max1 = Math.floor(max);
    return Math.floor(Math.random() * (max1 - min1)) + min1; // Максимум не включается, минимум включается
  }

  getNewDirection(
    directions: { dir: Direction; x: number; y: number }[],
    curDir: Direction
  ) {
    let newDir = curDir;
    const indNewDir = this.getRandomInt(0, directions.length - 1);
    newDir = directions[indNewDir].dir;
    return newDir;
  }

  getOppositeDirection(direction: number) {
    console.log(this);
    switch (direction) {
      case 0:
        return 2;
      case 1:
        return 3;
      case 2:
        return 0;
      case 3:
        return 1;
      default:
        return null;
    }
  }

  setMap(map: Map) {
    this.map = map;
    this.row = map.posY.length;
    this.col = map.posY[0].posX.length;
  }

  freeze() {
    this.frozen = true;
  }

  unfreeze() {
    this.frozen = false;
  }

  getType(x: number, y: number): string {
    return this.map?.posY[y]?.posX[x]?.type || '';
  }

  checkCollisions(): boolean {
    if (!this.frozen) {
      const gridX = this.getGridPosX(this.posX + this.dirX);
      const gridY = this.getGridPosY(this.posY + this.dirY);
      // console.log('head', this.initParameters.head);
      let gridAheadX = gridX;
      let gridAheadY = gridY;

      const field = this.getType(gridX, gridY);

      if (this.dirX === right.dirX && gridAheadX < this.col) {
        gridAheadX = this.getGridPosX(this.posX + step * this.dirX);
      }
      if (this.dirY === down.dirY && gridAheadY <= this.row) {
        gridAheadY = this.getGridPosY(this.posY + step * this.dirY);
      }

      const fieldAhead = this.getType(gridAheadX, gridAheadY);
      /* console.log(
        'fieldAhead',
        fieldAhead,
        gridAheadX,
        gridAheadY,
        gridX,
        gridY,
        this.posX,
        this.posY
      ); */
      const rad = 10;

      if (this.isCheckPill)
        this.checkPill(field, gridX, gridY, fieldAhead, rad);
      if (this.isCheckBonus)
        this.checkBonus(field, gridX, gridY, fieldAhead, rad);
      if (this.isCheckGhost)
        this.checkGhost(field, gridX, gridY, fieldAhead, rad);

      if (fieldAhead === 'wall' || fieldAhead === 'block') {
        this.stop();
        return false;
      }
    }
    return true;
  }

  checkCross() {
    const gridX = this.getGridPosX(this.posX);
    const gridY = this.getGridPosY(this.posY);
    const oppositeDir = this.getOppositeDirection(this.direction);
    const result = [];
    for (let i = 0; i < 4; ) {
      if (i !== oppositeDir) {
        const newDir = this.getDir(i);
        const newX = gridX + newDir.dirX;
        const newY = gridY + newDir.dirY;
        const fieldAhead = this.getType(newX, newY);
        // console.log('cross', i, newX, newY, fieldAhead);
        if (fieldAhead !== 'wall' && fieldAhead !== 'block')
          result.push({ dir: newDir, x: newX, y: newY });
      }
      i += 1;
    }

    return result;
  }

  getDir(indDir: number) {
    console.log(this);
    switch (indDir) {
      case 0:
        return right;
      case 1:
        return down;
      case 2:
        return left;
      case 3:
        return up;
      default:
        return up;
    }
  }

  checkPill(
    field: string,
    gridX: number,
    gridY: number,
    fieldAhead: string,
    rad: number
  ) {
    if (field === 'pill') {
      if (
        (this.dirX === 1 &&
          between(
            this.posX,
            toPixelPos(gridX) + this.radius - rad,
            toPixelPos(gridX + 1)
          )) ||
        (this.dirX === -1 &&
          between(this.posX, toPixelPos(gridX), toPixelPos(gridX) + rad)) ||
        (this.dirY === 1 &&
          between(
            this.posY,
            toPixelPos(gridY) + this.initParameters.head + this.radius - rad,
            toPixelPos(gridY) + this.initParameters.head
          )) ||
        (this.dirY === -1 &&
          between(
            this.posY,
            toPixelPos(gridY) + this.initParameters.head,
            toPixelPos(gridY + 1) + this.initParameters.head + rad
          )) ||
        fieldAhead === 'wall'
      ) {
        this.score += 20;
        this.map.posY[gridY].posX[gridX].type = 'null';
      }
    }
  }

  checkGhost(
    field: string,
    gridX: number,
    gridY: number,
    fieldAhead: string,
    rad: number
  ) {
    console.log(this);
    return { field, gridX, gridY, fieldAhead, rad };
  }

  checkBonus(
    field: string,
    gridX: number,
    gridY: number,
    fieldAhead: string,
    rad: number
  ) {
    console.log(this);
    return { field, gridX, gridY, fieldAhead, rad };
  }

  checkDirectionChange(): void {
    if (this.directionWatcher.get() !== null) {
      const dir = this.directionWatcher.get();

      if (dir) {
        const x = this.getGridPosX() + dir.dirX;
        const y = this.getGridPosY() + dir.dirY;

        if (x < this.col && x >= 0 && y < this.row && y >= 1) {
          if (dir) {
            this.dirX = dir.dirX;
            this.dirY = dir.dirY;
            this.direction = dir.direction;
          }
        }
      }
    }
  }

  setDirection(dir: {
    dirX: number;
    dirY: number;
    angle1: number;
    angle2: number;
    direction: number;
  }): void {
    if (!this.frozen) {
      this.dirX = dir.dirX;
      this.dirY = dir.dirY;
      this.angle1 = dir.angle1;
      this.angle2 = dir.angle2;
      this.direction = dir.direction;
    }
  }

  move() {
    console.log('frozen', this.frozen);
    if (!this.frozen) {
      // console.log('move', this.posX, this.posY);
      // console.log('ghostmap', this.map.posY[13].posX[3].type);
      this.posX += this.speed * this.dirX;
      this.posY += this.speed * this.dirY;
      const head = this.initParameters.head * 1.3;

      const startLoop = 1;
      if (this.posX >= this.initParameters.width - this.radius) {
        this.posX = startLoop - this.radius;
      }
      if (this.posX <= 0 - this.radius) {
        this.posX = this.initParameters.width - startLoop - this.radius;
      }
      if (this.posY >= this.initParameters.height - this.radius) {
        this.posY = head + startLoop - this.radius;
      }
      if (this.posY - head <= 0 - this.radius) {
        this.posY = this.initParameters.height - startLoop - this.radius;
      }
    }
  }

  stop(): void {
    this.dirX = 0;
    this.dirY = 0;
  }

  moveRightLeft() {
    if (
      this.posY <
        this.initParameters.head + this.initParameters.borderWalls * 2 &&
      this.dirY === 0 &&
      this.dirX === 0
    ) {
      this.dirY += 1;
      this.dirX += 1;
    }
  }

  moveUpDown() {
    if (this.posX < step && this.dirY === 0 && this.dirX === 0) {
      this.dirY -= 1;
      this.dirX += 1;
    }
  }

  getGridPosX(posX = this.posX): number {
    const result = (posX - (posX % step)) / step;
    // console.log('%', posX % step);
    // if ((posX % step) >= 19) result = result + 1;
    return result;
  }

  getGridPosY(posY = this.posY): number {
    return (
      (posY -
        this.initParameters.head -
        ((posY - this.initParameters.head) % step)) /
      step
    );
  }

  startPosition() {
    this.posX = 260; // this.initParameters.borderWalls; TODO
    this.posY = 285; // this.initParameters.height / 2 - this.radius + head; TODO
    this.setDirection(up);
    this.directionWatcher.set(up);
  }

  reset(): void {
    this.startPosition();
    this.freeze();

    this.isMouthOpen = true;
    this.score = 0;
  }
}
