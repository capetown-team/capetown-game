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

  stuckX = 0;
  stuckY = 0;

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

      const rad = 10;

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
              toPixelPos(gridY) + this.radius - rad,
              toPixelPos(gridY + 1)
            )) ||
          (this.dirY === -1 &&
            between(this.posY, toPixelPos(gridY), toPixelPos(gridY) + rad)) ||
          fieldAhead === 'wall'
        ) {
          this.score += 20;
          this.initParameters.allCount -= 1;
          this.map.posY[gridY].posX[gridX].type = 'null';
        }
      }

      if (fieldAhead === 'wall') {
        this.stuckX = this.dirX;
        this.stuckY = this.dirY;

        this.stop();

        const step = 1;
        if (this.stuckX === -1) {
          this.posX += step;
        }
        if (this.stuckY === -1) {
          this.posY += step;
        }
      }
    }
  }

  checkDirectionChange(): void {
    const dir = this.directionWatcher.get();
    if (dir !== null && this.isStep()) {
      const x = this.getGridPosX() + dir.dirX;
      const y = this.getGridPosY() + dir.dirY;
      const next = this.map.posY[y]?.posX[x];

      if (next?.type !== 'wall') {
        this.dirX = dir.dirX;
        this.dirY = dir.dirY;
        this.direction = dir.direction;
      }
    }
  }

  isStep() {
    return this.posX % step === 0 && this.posY % step === 0;
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
    if (!this.frozen) {
      this.posX += this.speed * this.dirX;
      this.posY += this.speed * this.dirY;
      const head = this.initParameters.head * 1.3;
      const startLoop = 1;

      // начальная точка откуда будет появляться персонаж
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

  getGridPosX(): number {
    return (this.posX - (this.posX % step)) / step;
  }

  getGridPosY(): number {
    return (this.posY - (this.posY % step)) / step;
  }

  startPosition() {
    const { head } = this.initParameters;
    this.posY = this.initParameters.height / 2 - this.radius + head;
    this.posX = 0;
    this.setDirection(right);
    this.directionWatcher.set(right);
  }

  reset(): void {
    this.startPosition();
    this.freeze();

    this.isMouthOpen = true;
    // this.score = 0;
  }
}
