import { ColorType } from '@game/script/helpers/constants';
import { buildBlock, toPixelPos } from '@game/script/helpers/action';
import { dataMap } from '@game/script/helpers/data';
import { InitParameters } from '@game/script/Types';
import { Pacman } from '@game/script/Pacman';

export class Figure {
  map = dataMap;
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

  drawCoins() {
    let posY = 0;
    this.ctx.strokeStyle = ColorType.White;
    this.ctx.fillStyle = ColorType.White;
    this.ctx.beginPath();

    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row) => {
        posY = row.row;

        row.posX.forEach((column) => {
          if (column.type === 'pill') {
            this.ctx.arc(
              toPixelPos(column.col) + this.pacman.radius,
              toPixelPos(posY) +
                this.pacman.radius / 2 +
                this.initParameters.head +
                5,
              this.radiusCount,
              0,
              2 * Math.PI
            );
            this.ctx.moveTo(toPixelPos(column.col), toPixelPos(posY));
          }
        });
      });
    }

    this.ctx.fill();
  }

  drawBlocks() {
    let posY = 0;
    this.ctx.strokeStyle = ColorType.Gray;
    this.ctx.fillStyle = ColorType.Gray;
    this.ctx.beginPath();

    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row) => {
        posY = row.row;

        row.posX.forEach((column) => {
          if (column.type === 'block') {
            buildBlock(
              this.ctx,
              toPixelPos(column.col),
              toPixelPos(posY) + this.initParameters.head
            );
          }
        });
      });
    }

    this.ctx.fill();
  }

  drawStrength() {
    let posY = 0;
    this.ctx.strokeStyle = ColorType.Red;
    this.ctx.fillStyle = ColorType.Red;
    this.ctx.beginPath();

    if (this.map && this.map.posY && this.map.posY.length > 0) {
      this.map.posY.forEach((row) => {
        posY = row.row;

        row.posX.forEach((column) => {
          if (column.type === 'strength') {
            this.ctx.arc(
              toPixelPos(column.col) + this.pacman.radius,
              toPixelPos(posY) +
                this.pacman.radius / 2 +
                this.initParameters.head +
                3,
              7,
              0,
              2 * Math.PI
            );
            this.ctx.moveTo(toPixelPos(column.col), toPixelPos(posY));
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
}
