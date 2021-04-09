import { InitParameters } from '@game/script/Types';
import { Pacman } from '@game/script/Pacman';
import { Figure } from '@game/script/Figure';
import { Ghost } from '@game/script/Ghost';
import { Header } from '@game/script/Header';
import { down, left, right, up, drawText } from '@game/script/helpers/action';
import { ColorType } from '@game/script/helpers/constants';

import ghostPinkyIcon from '@game/script/images/ghost-pinky.png';
import ghostBlinkyIcon from '@game/script/images/ghost-blinky.png';
import ghostGlydeIcon from '@game/script/images/ghost-glyde.png';
import ghostInkyIcon from '@game/script/images/ghost-inky.png';

type FunctionPostResult = (engine: Engine) => void;

export class Engine {
  started = false;
  pause = false;
  gameOver = false;
  requestId: null | number = null;
  steps = 0;
  postResult;

  public ctx!: CanvasRenderingContext2D;
  public pacman!: Pacman;
  public figure!: Figure;
  public header!: Header;

  public pinky!: Ghost;
  public blinky!: Ghost;
  public glyde!: Ghost;
  public inky!: Ghost;

  readonly initParameters!: InitParameters;

  constructor(
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D,
    postResult: FunctionPostResult
  ) {
    if (canvas) {
      this.ctx = ctx;
      this.initParameters = {
        width: canvas.width,
        height: canvas.height,
        head: 20,
        level: 1,
        allCount: 0
      };
      this.pacman = new Pacman(this.initParameters);
      this.figure = new Figure(this.ctx, this.initParameters, this.pacman);
      this.postResult = postResult;
      this.header = new Header(
        this.ctx,
        this.initParameters,
        this.pacman,
        this.figure
      );

      this.createGhost();
    }
  }

  stopAnimation() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  reset() {
    this.gameOver = true;
    this.started = false;
    this.pause = false;
    this.header.hearts = 3;

    this.pacman.reset();
    this.stopAnimation();

    window.removeEventListener('keydown', this.doKeyDown);
  }

  pauseGame() {
    if (!this.pause && !this.gameOver) {
      this.pause = true;
      this.stopAnimation();
    } else if (!this.gameOver) {
      this.startGame();
    }
  }

  finishGame() {
    this.gameOver = true;
    this.blank(ColorType.LIGHTGRAY);

    const textInfo =
      this.initParameters.level > 2 ? 'Вы прошли игру' : 'Вы завершили игру';
    drawText(
      this.ctx,
      textInfo,
      '17',
      ColorType.BLACK,
      this.initParameters.width / 2 - textInfo.length * 5.3,
      this.initParameters.height / 2 - 50
    );
    if (this.pacman.score > 0) {
      const textScore = `Ваш счет ${this.pacman.score} очков`;
      drawText(
        this.ctx,
        textScore,
        '15',
        ColorType.BLACK,
        this.initParameters.width / 2 - textScore.length * 4.4,
        this.initParameters.height / 2 - 20
      );
    }

    this.reset();
  }

  newGame() {
    this.reset();
    this.gameOver = false;
    this.header.hearts = 3;
    this.initParameters.level = 1;
    this.figure.updateCoins();
    this.pacman.reset();
    this.pacman.score = 0;
    this.pacman.directionWatcher.set(right);

    this.createGhost();

    this.startGame();
  }

  newLevel() {
    this.reset();
    this.figure.updateCoins();
    this.pacman.reset();
    this.pacman.directionWatcher.set(right);
    this.figure.getAllCounts();

    this.initParameters.level += 1;

    this.createGhost();
    // this.startGame();
  }

  createGhost() {
    this.pinky = new Ghost(
      this.ctx,
      this.initParameters,
      14,
      14,
      ghostPinkyIcon,
      down
    );
    this.blinky = new Ghost(
      this.ctx,
      this.initParameters,
      13,
      14,
      ghostBlinkyIcon,
      down
    );
    this.glyde = new Ghost(
      this.ctx,
      this.initParameters,
      12,
      14,
      ghostGlydeIcon,
      right
    );
    this.inky = new Ghost(
      this.ctx,
      this.initParameters,
      15,
      14,
      ghostInkyIcon,
      left
    );
  }

  startGame() {
    if (this.started && !this.pause) {
      this.pacman.reset();
      this.figure.updateCoins();

      return;
    }

    this.pause = false;
    this.started = true;
    this.gameOver = false;

    if (!this.pacman) {
      this.pacman = new Pacman(this.initParameters);
    }
    this.pacman.stop();
    this.steps = 0;
    this.figure.getAllCounts();

    this.gameLoop();

    window.addEventListener('keydown', (event) => this.doKeyDown(event));
  }

  endGame() {
    setTimeout(() => {
      this.stopAnimation();
      this.blank(ColorType.LIGHTGRAY);
      this.gameOver = true;
      drawText(
        this.ctx,
        'Игра окончена',
        '17',
        ColorType.BLACK,
        this.initParameters.width / 2 - 70,
        this.initParameters.height / 2 - 50
      );
      const textScore = `Ваш счет ${this.pacman.score} очков`;
      drawText(
        this.ctx,
        textScore,
        '15',
        ColorType.BLACK,
        this.initParameters.width / 2 - textScore.length * 4.4,
        this.initParameters.height / 2 - 20
      );
    });
  }

  blank(color = ColorType.LIGHTGRAY) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      0,
      0,
      this.initParameters.width,
      this.initParameters.height
    );
  }

  gameLoop() {
    if (typeof navigator !== 'undefined' && navigator.getGamepads) {
      const gamepads = navigator.getGamepads();

      if (gamepads && gamepads[0]) {
        const gp = gamepads[0];

        if (gp.buttons[12].pressed) {
          this.doKeyDown({ keyCode: 38 });
        } else if (gp.buttons[13].pressed) {
          this.doKeyDown({ keyCode: 40 });
        } else if (gp.buttons[14].pressed) {
          this.doKeyDown({ keyCode: 37 });
        } else if (gp.buttons[15].pressed) {
          this.doKeyDown({ keyCode: 39 });
        }
      }
    }

    this.blank(ColorType.BLACK);
    this.figure.drawCoins();
    this.figure.drawWalls();
    this.header.drawHeader();

    // пакмен начало
    this.ctx.fillStyle = ColorType.GOLD;
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
    // пакмен конец

    // призраки начало
    this.pinky.draw();
    this.pinky.move();

    this.blinky.draw();
    this.blinky.move();

    this.glyde.draw();
    this.glyde.move();

    this.inky.draw();
    this.inky.move();

    if (
      this.pinky.isTouch(this.pacman) ||
      this.blinky.isTouch(this.pacman) ||
      this.glyde.isTouch(this.pacman) ||
      this.inky.isTouch(this.pacman)
    ) {
      if (this.header.hearts > 1) {
        this.header.hearts -= 1;
        this.pacman.startPosition();
        this.pacman.freeze();
      } else {
        if (this.postResult !== undefined) {
          this.postResult(this);
        }
        this.endGame();
      }
    }

    // призраки конец

    // общий счет
    if (this.initParameters.allCount === 0 && this.initParameters.level <= 2) {
      this.newLevel();
    }
    if (this.initParameters.allCount === 0 && this.initParameters.level > 2) {
      this.finishGame();
    }

    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  doKeyDown(evt: { keyCode: number; preventDefault?: () => void }) {
    this.pacman.unfreeze();

    switch (evt.keyCode) {
      case 38:
        if (evt.preventDefault) {
          evt.preventDefault();
        }
        this.pacman.directionWatcher.set(up);
        break;
      case 40:
        if (evt.preventDefault) {
          evt.preventDefault();
        }
        this.pacman.directionWatcher.set(down);
        break;
      case 37:
        if (evt.preventDefault) {
          evt.preventDefault();
        }
        this.pacman.directionWatcher.set(left);
        break;
      case 39:
        if (evt.preventDefault) {
          evt.preventDefault();
        }
        this.pacman.directionWatcher.set(right);
        break;

      // no default
    }
  }
}
