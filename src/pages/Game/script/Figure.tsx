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
  /*
  drawWalls() {
    this.ctx.fillStyle = ColorType.Gray;

    // Верхняя преграда
    buildWall(
      this.ctx,
      0,
      this.initParameters.head,
      this.initParameters.width / 2 - this.pacman.radius * 2,
      this.initParameters.borderWalls
    );
    buildWall(
      this.ctx,
      this.initParameters.width / 2 + this.pacman.radius * 2,
      this.initParameters.head,
      this.initParameters.width / 2 - this.pacman.radius * 2,
      this.initParameters.borderWalls
    );

    // Нижняя преграда
    buildWall(
      this.ctx,
      0,
      this.initParameters.height - this.initParameters.borderWalls,
      this.initParameters.width / 2 - this.pacman.radius * 2,
      this.initParameters.borderWalls
    );
    buildWall(
      this.ctx,
      this.initParameters.width / 2 + this.pacman.radius * 2,
      this.initParameters.height - this.initParameters.borderWalls,
      this.initParameters.width / 2 - this.pacman.radius * 2,
      this.initParameters.borderWalls
    );

    // Левая преграда
    buildWall(
      this.ctx,
      0,
      this.initParameters.head,
      this.initParameters.borderWalls,
      this.initParameters.height / 2 -
        this.pacman.radius * 2 -
        this.initParameters.borderWalls
    );
    buildWall(
      this.ctx,
      0,
      this.initParameters.height / 2 +
        this.pacman.radius * 2 +
        this.initParameters.borderWalls,
      this.initParameters.borderWalls,
      this.initParameters.height / 2 - this.pacman.radius * 2
    );

    // Правая преграда
    buildWall(
      this.ctx,
      this.initParameters.width - this.initParameters.borderWalls,
      this.initParameters.head,
      this.initParameters.borderWalls,
      this.initParameters.height / 2 -
        this.pacman.radius * 2 -
        this.initParameters.borderWalls
    );
    buildWall(
      this.ctx,
      this.initParameters.width - this.initParameters.borderWalls,
      this.initParameters.height / 2 +
        this.pacman.radius * 2 +
        this.initParameters.borderWalls,
      this.initParameters.borderWalls,
      this.initParameters.height / 2 - this.pacman.radius * 2
    );
  } */

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
