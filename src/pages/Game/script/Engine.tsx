import { InitParameters } from '@/pages/Game/script/Types';
import { Pacman } from '@/pages/Game/script/Pacman';
import { right, left, up, down } from '@/pages/Game/script/constants';

export class Engine {
  started = false;
  pause = false;
  gameOver = false;

  level = 1;
  hearts = 3;

  steps = 0;

  requestId = 0;

  public ctx!: CanvasRenderingContext2D;
  public pacman!: Pacman;

  readonly initParameters!: InitParameters;

  constructor(canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D) {
    if (canvas) {
      this.ctx = ctx;
      this.initParameters = {
        width: canvas.width,
        height: canvas.height
      };
    }
  }

  reset() {
    this.gameOver = true;
    this.started = false;
    this.pause = false;

    this.pacman.reset();
    this.blank('white');
  }

  pauseGame() {
    if (!this.pause) {
      this.pause = true;

      if (this.requestId) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = 0;
      }
    } else {
      this.startGame();
    }
  }

  finishGame() {
    this.reset();

    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = 0;
    }
  }

  newGame() {
    this.pacman.reset();
    this.pacman.directionWatcher.set(right);
    this.startGame();
  }

  startGame() {
    if (this.started && this.pause !== true) {
      this.pacman.reset();

      return;
    }

    this.pause = false;
    this.started = true;

    if (!this.pacman) {
      this.pacman = new Pacman(this.initParameters);
    }
    this.pacman.stop();
    this.steps = 0;

    this.gameLoop();

    window.addEventListener('keydown', (event) => this.doKeyDown(event));
  }

  blank(color = '#f3f4f7') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      0,
      0,
      this.initParameters.width,
      this.initParameters.height
    );
  }

  gameLoop() {
    this.blank();
    this.ctx.fillStyle = 'Gold';
    this.ctx.beginPath();

    if (this.pacman.isMouthOpen) {
      const deltaRadians = (this.pacman.direction * Math.PI) / 2;
      this.ctx.arc(
        this.pacman.posX + this.pacman.radius,
        this.pacman.posY + this.pacman.radius,
        this.pacman.radius,
        deltaRadians + Math.PI / this.pacman.angle1,
        deltaRadians + this.pacman.angle2 * Math.PI
      );
      this.ctx.lineTo(
        this.pacman.posX + this.pacman.radius,
        this.pacman.posY + this.pacman.radius
      );
    } else {
      this.ctx.arc(
        this.pacman.posX + this.pacman.radius,
        this.pacman.posY + this.pacman.radius,
        this.pacman.radius,
        0,
        2 * Math.PI
      );
    }
    this.pacman.move();
    this.pacman.checkDirectionChange();
    this.ctx.fill();

    this.steps += 1;
    if (this.steps % this.pacman.stepMounth === 0) {
      this.pacman.isMouthOpen = !this.pacman.isMouthOpen;
    }
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  doKeyDown(evt: { keyCode: number }) {
    switch (evt.keyCode) {
      case 38:
        this.pacman.directionWatcher.set(up);
        break;
      case 40:
        this.pacman.directionWatcher.set(down);
        break;
      case 37:
        this.pacman.directionWatcher.set(left);
        break;
      case 39:
        this.pacman.directionWatcher.set(right);
        break;
      default:
    }
  }
}
