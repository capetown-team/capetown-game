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
  //
  drawHeader() {
    this.ctx.fillStyle = ColorType.white;
    this.ctx.fillRect(
      0,
      0,
      this.initParameters.width,
      this.initParameters.head
    );

    const textScore = `Очков: ${this.pacman.score}`;
    const textLevel = `Уровень: ${this.level}`;
    this.ctx.font = '15pt Source Sans Pro';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(textScore, this.initParameters.width / 2 - 50, 20);
    this.ctx.font = '12pt Source Sans Pro';
    this.ctx.fillText(textLevel, 30, 20);

    for (let i = 0; i < this.hearts; i += 1) {
      this.drawHearts(this.initParameters.width - 100 + 30 * i, 2);
    }
  }

  drawHearts(left: number, top: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';

    const d = 20 + 5 * Math.cos(2);
    const k = top + 2.5 * Math.sin(2);

    this.ctx.moveTo(k + left, k + d / 4);
    this.ctx.quadraticCurveTo(k + left, k, k + left + d / 4, k);
    this.ctx.quadraticCurveTo(k + left + d / 2, k, k + left + d / 2, k + d / 4);
    this.ctx.quadraticCurveTo(k + left + d / 2, k, k + left + (d * 3) / 4, k);
    this.ctx.quadraticCurveTo(k + left + d, k, k + left + d, k + d / 4);
    this.ctx.quadraticCurveTo(
      k + left + d,
      k + d / 2,
      k + left + (d * 3) / 4,
      k + (d * 3) / 4
    );
    this.ctx.lineTo(k + left + d / 2, k + d);
    this.ctx.lineTo(k + left + d / 4, k + (d * 3) / 4);
    this.ctx.quadraticCurveTo(k + left, k + d / 2, k + left, k + d / 4);

    this.ctx.fill();
  }
}
