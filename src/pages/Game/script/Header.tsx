import { ColorType } from '@game/script/helpers/constants';
import { InitParameters } from '@game/script/Types';
import { Pacman } from '@game/script/Pacman';

export class Header {
  level = 1;
  hearts = 3;

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

  drawText(text: string, size: string, color: string, x: number, y: number) {
    const textScore = text;
    this.ctx.font = `${size}pt Source Sans Pro`;
    this.ctx.fillStyle = color;
    this.ctx.fillText(textScore, x, y);
  }

  drawHeader() {
    this.ctx.fillStyle = ColorType.White;
    this.ctx.fillRect(
      0,
      0,
      this.initParameters.width,
      this.initParameters.head
    );

    this.drawText(
      `Очков: ${this.pacman.score}`,
      '15',
      ColorType.Black,
      this.initParameters.width / 2 - 50,
      20
    );
    this.drawText(`Уровень: ${this.level}`, '12', ColorType.Black, 30, 20);

    for (let i = 0; i < this.hearts; i += 1) {
      this.drawHearts(this.initParameters.width - 100 + 30 * i, 5);
    }
  }

  drawHearts(left: number, top: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = ColorType.Red;

    const radius = 20 + 5 * Math.cos(2);
    const position = top + 2 * Math.sin(2);

    this.ctx.moveTo(position + left, position + radius / 4);
    this.ctx.quadraticCurveTo(
      position + left,
      position,
      position + left + radius / 4,
      position
    );
    this.ctx.quadraticCurveTo(
      position + left + radius / 2,
      position,
      position + left + radius / 2,
      position + radius / 4
    );
    this.ctx.quadraticCurveTo(
      position + left + radius / 2,
      position,
      position + left + (radius * 3) / 4,
      position
    );
    this.ctx.quadraticCurveTo(
      position + left + radius,
      position,
      position + left + radius,
      position + radius / 4
    );
    this.ctx.quadraticCurveTo(
      position + left + radius,
      position + radius / 2,
      position + left + (radius * 3) / 4,
      position + (radius * 3) / 4
    );
    this.ctx.lineTo(position + left + radius / 2, position + radius);
    this.ctx.lineTo(position + left + radius / 4, position + (radius * 3) / 4);
    this.ctx.quadraticCurveTo(
      position + left,
      position + radius / 2,
      position + left,
      position + radius / 4
    );

    this.ctx.fill();
  }
}
