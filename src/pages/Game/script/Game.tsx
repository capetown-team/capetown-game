import { InitParameters } from '@/pages/Game/script/Types';
import { Pacman } from '@/pages/Game/script/Pacman';
import { right, left, up, down } from '@/pages/Game/script/constants';

export class Engine {
  started = false;
  pause = false;
  gameOver = false;

  level = 1;
  game = {
    width: 100,
    height: 100
  };

  requestId = 0;

  public ctx!: CanvasRenderingContext2D;
  public pacman!: Pacman;

  readonly initParameters!: InitParameters;

  constructor(canvas: HTMLCanvasElement | null) {
    if (canvas) {
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      this.initParameters = {
        width: canvas.width,
        height: canvas.height
      };
    }
  }

  reset() {
    this.pause = false;
    this.gameOver = false;
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
    this.gameOver = true;
    this.started = false;
    this.pause = false;
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
    let steps = 0;

    const gameLoop = () => {
      this.ctx.fillStyle = 'Gold';
      this.ctx.strokeStyle = 'Gold';

      this.ctx.clearRect(
        0,
        0,
        this.initParameters.width,
        this.initParameters.height
      );
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

      steps += 1;
      if (steps % this.pacman.stepMounth === 0) {
        this.pacman.isMouthOpen = !this.pacman.isMouthOpen;
      }
      this.requestId = window.requestAnimationFrame(gameLoop);
    };

    window.addEventListener('keydown', (event) => this.doKeyDown(event));

    gameLoop();
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
