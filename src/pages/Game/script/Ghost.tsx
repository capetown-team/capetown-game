import { FigureType, InitParameters } from '@game/script/Types';
import {
  between,
  down,
  nextDir,
  setDirectionGhost
} from '@game/script/helpers/action';
import { step, DirectionType } from '@game/script/helpers/constants';
import { DirectionWatch } from '@game/script/Direction/DirectionWatch';
import { dataMap } from '@game/script/helpers/data';
import { Direction } from '@game/script/Direction/Direction';

export class Ghost {
  public ctx!: CanvasRenderingContext2D;
  posX: number;
  posY: number;
  startPosX: number;
  startPosY: number;

  stop = false;
  speed = 1;
  radius = 20;

  initParameters: InitParameters;
  private image: HTMLImageElement;
  directionWatcher = new DirectionWatch();

  dirX = down.dirX;
  dirY = down.dirY;
  direction = down.direction;

  map = dataMap;

  constructor(
    ctx: CanvasRenderingContext2D,
    initParameters: InitParameters,
    gridPosX: number,
    gridPosY: number,
    image: string,
    direction: Direction
  ) {
    this.ctx = ctx;
    this.posX = gridPosX * step;
    this.posY = gridPosY * step;
    this.startPosX = gridPosX * step;
    this.startPosY = gridPosY * step;

    this.direction = direction.direction;
    this.dirX = direction.dirX;
    this.dirY = direction.dirY;

    this.image = new Image();
    this.image.src = image;

    this.initParameters = initParameters;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.radius,
      this.radius
    );
  }

  getCenterX() {
    return this.posX + this.radius;
  }

  getCenterY() {
    return this.posY + this.radius;
  }

  isTouch(pacman: FigureType): boolean {
    return (
      between(
        pacman.posY + pacman.radius,
        this.getCenterY() - this.radius,
        this.getCenterY() + this.radius
      ) &&
      between(
        pacman.posX + pacman.radius,
        this.getCenterX() - this.radius,
        this.getCenterX() + this.radius
      )
    );
  }

  move() {
    this.checkDirectionChange();

    if (!this.stop) {
      this.posX += this.speed * this.dirX;
      this.posY += this.speed * this.dirY;
      const head = this.initParameters.head * 1.3;

      if (this.posX >= this.initParameters.width - this.radius) {
        this.posX = this.speed - this.radius;
      }
      if (this.posX <= 0 - this.radius) {
        this.posX = this.initParameters.width - this.speed - this.radius;
      }
      if (this.posY >= this.initParameters.height - this.radius) {
        this.posY = head + this.speed - this.radius;
      }
      if (this.posY - head <= 0 - this.radius) {
        this.posY = this.initParameters.height - this.speed - this.radius;
      }
    }
  }

  inGrid() {
    return this.posX % this.radius === 0 && this.posY % this.radius === 0;
  }

  checkDirectionChange() {
    const dir = this.directionWatcher.get();

    if (this.inGrid() && dir === null) {
      this.getNextDirection();
    }
    if (dir != null && this.inGrid()) {
      this.setDirection(dir);
      this.directionWatcher.set(null);
    }
  }

  setDirection(dir: {
    dirX: number;
    dirY: number;
    angle1: number;
    angle2: number;
    direction: number;
  }): void {
    this.dirX = dir.dirX;
    this.dirY = dir.dirY;
    this.direction = dir.direction;
  }

  getGridPosX(): number {
    return (this.posX - (this.posX % step)) / step;
  }

  getGridPosY(): number {
    return (this.posY - (this.posY % step)) / step;
  }

  nextStep(currentDir: number, step: number, arrow: string) {
    let x = this.getGridPosX();
    let y = this.getGridPosY();
    if (currentDir === 2) {
      x = this.getGridPosX() - step;
    } else if (currentDir === 0) {
      x = this.getGridPosX() + step;
    }
    if (currentDir === 3) {
      y = this.getGridPosY() - step;
    } else if (currentDir === 1) {
      y = this.getGridPosY() + step;
    }

    if (arrow === 'up') {
      y -= 1;
    }
    if (arrow === 'down') {
      y += 1;
    }
    if (arrow === 'right') {
      x += 1;
    }
    if (arrow === 'left') {
      x -= 1;
    }

    return this.map.posY[y]?.posX[x];
  }

  getNextDirection() {
    const currentDir = this.direction;
    const next = this.nextStep(currentDir, 2, '');
    const current = this.nextStep(currentDir, 1, '');
    const arrowUp = this.nextStep(currentDir, 1, 'up');
    const arrowDown = this.nextStep(currentDir, 1, 'down');
    const arrowRight = this.nextStep(currentDir, 1, 'right');
    const arrowLeft = this.nextStep(currentDir, 1, 'left');
    const directions = [];

    let r: Direction | null = null;

    if (arrowUp?.type === 'wall') {
      directions.push(DirectionType.UP);
    }
    if (arrowDown?.type === 'wall') {
      directions.push(DirectionType.DOWN);
    }
    if (arrowRight?.type === 'wall') {
      directions.push(DirectionType.RIGHT);
    }
    if (arrowLeft?.type === 'wall') {
      directions.push(DirectionType.LEFT);
    }

    // Выходи из дома
    if (
      current?.type !== 'wall' &&
      this.posY === 280 &&
      (this.posX === 280 || this.posX === 260)
    ) {
      // console.log('--');
      r = down;
    }

    if (current?.type === 'wall') {
      this.stop = true;
      const newDir = nextDir(directions);

      r = setDirectionGhost(newDir);
    }

    if (next?.type === 'wall') {
      const newDir = nextDir(directions);

      r = setDirectionGhost(newDir);
    }

    setTimeout(() => {
      this.stop = false;
    }, 100);

    // console.log('new r', r);
    if (r) {
      this.directionWatcher.set(r);
    }
    return r;
  }
}
