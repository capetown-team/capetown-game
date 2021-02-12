import { right } from '@/pages/Game/script/constants';
import { InitParameters } from '@/pages/Game/script/Types';
import { DirectionWatch } from '@/pages/Game/Direction/DirectionWatch';

export class Pacman {
  radius = 20;
  posX = 0;
  posY = 0;
  speed = 3;
  stepMounth = 12;
  isMouthOpen = false;
  angle1 = 4;
  angle2 = 1.75;
  dirX = right.dirX;
  dirY = right.dirY;
  frozen = false;
  initParameters: InitParameters;
  directionWatcher = new DirectionWatch();
  direction = 0;

  constructor(initParameters: InitParameters) {
    this.initParameters = initParameters;
    this.posY = this.initParameters.height / 2 - this.radius;
  }

  checkDirectionChange() {
    if (this.directionWatcher.get() !== null) {
      const dir = this.directionWatcher.get();
      if (dir) {
        this.dirX = dir.dirX;
        this.dirY = dir.dirY;
        this.direction = dir.direction;
      }
    }
  }

  setDirection(dir: {
    dirX: number;
    dirY: number;
    angle1: number;
    angle2: number;
  }) {
    if (!this.frozen) {
      this.dirX = dir.dirX;
      this.dirY = dir.dirY;
      this.angle1 = dir.angle1;
      this.angle2 = dir.angle2;
    }
  }

  move() {
    if (!this.frozen) {
      this.posX += this.speed * this.dirX;
      this.posY += this.speed * this.dirY;

      if (this.posX >= this.initParameters.width - this.radius) {
        this.posX = 5 - this.radius;
      }
      if (this.posX <= 0 - this.radius) {
        this.posX = this.initParameters.width - 5 - this.radius;
      }
      if (this.posY >= this.initParameters.height - this.radius) {
        this.posY = 5 - this.radius;
      }
      if (this.posY <= 0 - this.radius) {
        this.posY = this.initParameters.height - 5 - this.radius;
      }
    }
  }

  stop() {
    this.dirX = right.dirX;
    this.dirY = right.dirY;
  }

  reset() {
    this.posX = 0;
    this.posY = this.initParameters.height / 2 - this.radius;

    this.setDirection(right);
  }
}
