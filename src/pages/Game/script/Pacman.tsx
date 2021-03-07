import { right, down, between, toPixelPos } from '@game/script/helpers/action';
import { step } from '@game/script/helpers/constants';
import { dataMap } from '@game/script/helpers/data';
import { InitParameters } from '@game/script/Types';
import { DirectionWatch } from '@game/script/Direction/DirectionWatch';

export class Pacman {
  radius = 10;
  posX = 0;
  posY = 0;
  speed = 1;
  stepMounth = 12;
  isMouthOpen = false;
  angle1 = right.angle1;
  angle2 = right.angle2;
  dirX = right.dirX;
  dirY = right.dirY;
  frozen = true;
  initParameters: InitParameters;
  directionWatcher = new DirectionWatch();
  direction = right.direction;

  map = dataMap;
  row = dataMap.posY.length;
  col = dataMap.posY[0].posX.length;

  score = 0;

  constructor(initParameters: InitParameters) {
    this.initParameters = initParameters;

    this.startPosition();
  }

  freeze() {
    this.frozen = true;
  }

  unfreeze() {
    this.frozen = false;
  }

  getType(x: number, y: number): string {
    // console.log('x2y2', x, y);
    // console.log(this.map?.posY[y]?.posX[x]?.type || '');
    // console.log(this.map);
    return this.map?.posY[y]?.posX[x]?.type || '';
  }

  checkCollisions(): void {
    if (!this.frozen) {
      const gridX = this.getGridPosX();
      const gridY = this.getGridPosY();
      let gridAheadX = gridX;
      let gridAheadY = gridY;

      const field = this.getType(gridX, gridY);

      if (this.dirX === right.dirX && gridAheadX < this.col) {
        gridAheadX += 1;
      }
      if (this.dirY === down.dirY && gridAheadY <= this.row) {
        gridAheadY += 1;
      }
      const fieldAhead = this.getType(gridAheadX, gridAheadY);
      // console.log('field', field, fieldAhead, gridX, gridY, gridAheadX, gridAheadY);
      // console.log(this.map?.posY[gridY]);
      const rad = 10;

      if (field === 'pill') {
        // console.log('pill', this.dirY, this.posY, toPixelPos(gridY), toPixelPos(gridY) + rad );
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
      // console.log(fieldAhead, gridX, gridY);
      if (fieldAhead === 'wall' || fieldAhead === 'block') {
        this.stop();
      }
    }
  }

  checkDirectionChange(): void {
    if (this.directionWatcher.get() !== null) {
      const dir = this.directionWatcher.get();
      console.log('dir1', dir);
      if (dir) {
        const x = this.getGridPosX() + dir.dirX;
        const y = this.getGridPosY() + dir.dirY;

        // console.log('dir', dir, x, y, this.posX, this.posY);
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
    // console.log('packman', this.posX, this.posY);
    if (!this.frozen) {
      this.posX += this.speed * this.dirX;
      this.posY += this.speed * this.dirY;
      const head = this.initParameters.head * 1.3;

      // начальная точка откуда будет появляться персонаж
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
    // console.log('xy', this.posX, this.posY);
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

  getGridPosX(): number {
    return (this.posX - (this.posX % step)) / step;
  }

  getGridPosY(): number {
    return (
      (this.posY -
        this.initParameters.head -
        ((this.posY - this.initParameters.head) % step)) /
      step
    );
  }

  startPosition() {
    // const head = this.initParameters.head / 2;TODO
    this.posY = 285; // this.initParameters.height / 2 - this.radius + head; TODO
    this.posX = 0; // this.initParameters.borderWalls; TODO
    this.setDirection(right);
    this.directionWatcher.set(right);
  }

  reset(): void {
    this.startPosition();
    this.freeze();

    this.isMouthOpen = true;
    this.score = 0;
  }
}
