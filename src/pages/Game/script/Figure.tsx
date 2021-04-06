import { ColorType, step } from '@game/script/helpers/constants';
import { toPixelPos } from '@game/script/helpers/action';
import { dataMap } from '@game/script/helpers/data';
import { InitParameters } from '@game/script/Types';
import { Pacman } from '@game/script/Pacman';

export class Figure {
  map = dataMap;

  allCount = 0;
  radiusCount = 3;

  initParameters: InitParameters;
  public ctx!: CanvasRenderingContext2D;
  public pacman!: Pacman;

  constructor(
    ctx: CanvasRenderingContext2D,
    initParameters: InitParameters,
    pacman: Pacman
  ) {
    this.ctx = ctx;
    this.initParameters = initParameters;
    this.pacman = pacman;
  }

  drawWalls() {
    let posY = 0;
    this.ctx.fillStyle = ColorType.GRAY;

    this.ctx.beginPath();

    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row) => {
        posY = row.row;

        row.posX.forEach((column) => {
          const y = toPixelPos(posY - 1); // top
          const x = toPixelPos(column.col - 1); // left

          if (column.type === 'wall') {
            this.ctx.fillRect(
              x - 10 + this.pacman.radius,
              y - 5 + this.pacman.radius / 2,
              step,
              step
            );
          }
        });
      });
    }

    this.ctx.fill();
  }

  drawCoins() {
    let posY = 0;
    this.ctx.strokeStyle = ColorType.YELLOW;
    this.ctx.fillStyle = ColorType.YELLOW;
    this.ctx.beginPath();

    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row) => {
        posY = row.row;

        row.posX.forEach((column) => {
          const y = toPixelPos(posY - 1); // top
          const x = toPixelPos(column.col - 1); // left

          if (column.type === 'null') {
            this.ctx.fillRect(
              x + this.pacman.radius,
              y + 3 + this.pacman.radius / 2,
              1,
              1
            );
          }

          if (column.type === 'pill') {
            this.ctx.arc(
              x + this.pacman.radius,
              y + 4 + this.pacman.radius / 2,
              this.radiusCount,
              0,
              2 * Math.PI
            );
            this.ctx.moveTo(x, y);
          }
        });
      });
    }

    this.ctx.fill();
  }

  updateCoins() {
    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row, inx1) => {
        row.posX.forEach((column, inx2) => {
          if (this.map.posY[inx1].posX[inx2].type === 'null') {
            this.map.posY[inx1].posX[inx2].type = 'pill';
          }
        });
      });
    }
  }

  getAllCounts() {
    this.allCount = 0;
    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row, inx1) => {
        row.posX.forEach((column, inx2) => {
          if (this.map.posY[inx1].posX[inx2].type === 'pill') {
            this.allCount += 1;
          }
        });
      });
    }
  }
}
