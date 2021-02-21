import { InitParameters } from '@game/script/Types';
import { Pacman } from '@game/script/Pacman';
import { Figure } from '@game/script/Figure';
import { Ghost } from '@game/script/Ghost';
import { Header } from '@game/script/Header';
import { down, left, right, up } from '@game/script/helpers/action';
import { ColorType } from '@game/script/helpers/constants';

export class Engine {
  started = false;
  pause = false;
  gameOver = false;

  requestId = 0;

  steps = 0;

  public ctx!: CanvasRenderingContext2D;
  public pacman!: Pacman;
  public figure!: Figure;
  public ghost!: Ghost;
  public header!: Header;

  readonly initParameters!: InitParameters;

  constructor(canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D) {
    if (canvas) {
      this.ctx = ctx;
      this.initParameters = {
        width: canvas.width,
        height: canvas.height,
        head: 30,
        borderWalls: 10
      };
      this.pacman = new Pacman(this.initParameters);
      this.figure = new Figure(this.ctx, this.initParameters, this.pacman);
      this.ghost = new Ghost(this.ctx);
      this.header = new Header(this.ctx, this.initParameters, this.pacman);
    }
  }

  reset() {
    this.gameOver = true;
    this.started = false;
    this.pause = false;
    this.header.hearts = 3;

    this.pacman.reset();
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
    this.figure.updateCoins();
    this.blank(ColorType.White);
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = 0;

      window.removeEventListener('keydown', this.doKeyDown);
    }
  }

  newGame() {
    this.header.hearts = 3;
    this.figure.updateCoins();
    this.pacman.reset();
    this.pacman.directionWatcher.set(right);

    this.startGame();
  }

  startGame() {
    if (this.started && !this.pause) {
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
    this.ghost.drawGhost();

    this.gameLoop();

    window.addEventListener('keydown', (event) => this.doKeyDown(event));
  }

  endGame() {
    this.reset();
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = 0;
    }
  }

  blank(color = ColorType.LightGrey) {
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
    this.header.drawHeader();
    this.figure.drawWalls();
    this.figure.drawCoins();
    this.ghost.drawGhost();
    this.ctx.fillStyle = ColorType.Gold;
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
    this.pacman.checkCollisions();
    this.ctx.fill();

    this.steps += 1;
    if (this.steps % this.pacman.stepMounth === 0) {
      this.pacman.isMouthOpen = !this.pacman.isMouthOpen;
    }

    if (this.ghost.isTouch(this.pacman, this.ghost.ghost)) {
      if (this.header.hearts > 1) {
        this.header.hearts -= 1;
        this.pacman.startPosition();
        this.pacman.freeze();
      } else {
        this.endGame();
      }
    }

    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  doKeyDown(evt: { keyCode: number; preventDefault(): void }) {
    this.pacman.unfreeze();

    switch (evt.keyCode) {
      case 38:
        evt.preventDefault();
        this.pacman.directionWatcher.set(up);
        break;
      case 40:
        evt.preventDefault();
        this.pacman.directionWatcher.set(down);
        break;
        evt.preventDefault();
      case 37:
        this.pacman.directionWatcher.set(left);
        break;
      case 39:
        evt.preventDefault();
        this.pacman.directionWatcher.set(right);
        break;
      default:
    }
  }
}
