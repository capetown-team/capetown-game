import { api } from '@/middlewares/api';
import { UserType } from '@/reducers/user/types';

import { InitParameters } from '@game/script/Types';
import { Pacman } from '@game/script/Pacman';
import { Figure } from '@game/script/Figure';
import { Ghost } from '@game/script/Ghost';
import { getDir, getNewDirection } from '@game/script/moveClass';
import { Header } from '@game/script/Header';
import { down, left, right, up, drawText } from '@game/script/helpers/action';
import { ColorType } from '@game/script/helpers/constants';
import { dataMap } from '@game/script/helpers/data';

export class Engine {
  user: UserType | undefined;
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
        head: 25,
        borderWalls: 10
      };
      this.pacman = new Pacman(this.initParameters, dataMap);
      this.figure = new Figure(this.ctx, this.initParameters, this.pacman);
      this.ghost = new Ghost(this.ctx, this.initParameters, dataMap);
      this.header = new Header(
        this.ctx,
        this.initParameters,
        this.pacman,
        this.figure
      );
    }
  }

  stopAnimation() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = 0;
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
    this.blank(ColorType.LightGrey);
    drawText(
      this.ctx,
      'Вы завершили игру',
      '17',
      ColorType.Black,
      this.initParameters.width / 2 - 85,
      this.initParameters.height / 2 - 50
    );
    if (this.pacman.score > 0) {
      const textScore = `Ваш счет ${this.pacman.score} очков`;
      drawText(
        this.ctx,
        textScore,
        '15',
        ColorType.Black,
        this.initParameters.width / 2 - textScore.length * 4.4,
        this.initParameters.height / 2 - 20
      );
    }
    this.postResult();
    this.reset();
  }

  postResult() {
    if (this.user !== undefined) {
      api.postLiderBoardResult({
        data: {
          pacmanScore: this.pacman.score,
          pacmanPlayer: this.user.first_name,
          pacmanAvatar: this.user.avatar,
          pacmanID: this.user.id
        },
        ratingFieldName: 'pacmanScore'
      });
    }
  }

  newGame(user: UserType) {
    this.reset();
    this.gameOver = false;
    this.header.hearts = 3;
    this.figure.updateCoins();
    this.pacman.reset();
    this.pacman.directionWatcher.set(right);
    this.ghost.reset();
    this.ghost.directionWatcher.set(right);

    this.startGame(user);
  }

  startGame(user: UserType | undefined = undefined) {
    if (user !== undefined) this.user = user;

    if (this.started && !this.pause) {
      this.pacman.reset();
      this.figure.updateCoins();

      return;
    }

    this.pause = false;
    this.started = true;
    this.gameOver = false;

    if (!this.pacman) {
      this.pacman = new Pacman(this.initParameters, dataMap);
    }
    this.pacman.stop();
    this.steps = 0;
    this.ghost.drawGhost();

    this.gameLoop();

    window.addEventListener('keydown', (event) => this.doKeyDown(event));
  }

  endGame() {
    this.postResult();
    setTimeout(() => {
      this.stopAnimation();
      this.blank(ColorType.LightGrey);
      this.gameOver = true;
      drawText(
        this.ctx,
        'Игра окончена',
        '17',
        ColorType.Black,
        this.initParameters.width / 2 - 70,
        this.initParameters.height / 2 - 50
      );
      const textScore = `Ваш счет ${this.pacman.score} очков`;
      drawText(
        this.ctx,
        textScore,
        '15',
        ColorType.Black,
        this.initParameters.width / 2 - textScore.length * 4.4,
        this.initParameters.height / 2 - 20
      );
    });
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

    this.blank(ColorType.Black);
    this.header.drawHeader();
    this.figure.drawCoins();
    this.ghost.drawGhost();
    this.figure.drawBlocks();
    this.figure.drawStrength();

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
    this.ctx.closePath();

    const directions = this.ghost.checkCross();
    let successful = false;
    while (!successful) {
      successful = this.ghost.checkCollisions();
      if (!successful) {
        const newDir = getNewDirection(
          directions,
          getDir(this.ghost.direction)
        );
        this.ghost.setDirection(newDir);
      }
    }

    this.ghost.move();

    this.steps += 1;
    if (this.steps % this.pacman.stepMounth === 0) {
      this.pacman.isMouthOpen = !this.pacman.isMouthOpen;
    }

    if (this.ghost.isTouch(this.pacman)) {
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

  doKeyDown(evt: { keyCode: number; preventDefault?: () => void }) {
    this.pacman.unfreeze();
    this.ghost.unfreeze();

    if (evt.preventDefault) {
      evt.preventDefault();
    }

    switch (evt.keyCode) {
      case 38:
        this.pacman.moveUpDown();

        this.pacman.directionWatcher.set(up);
        break;
      case 40:
        this.pacman.moveUpDown();

        this.pacman.directionWatcher.set(down);
        break;
      case 37:
        this.pacman.moveRightLeft();

        this.pacman.directionWatcher.set(left);
        break;
      case 39:
        this.pacman.moveRightLeft();

        this.pacman.directionWatcher.set(right);
        break;

      // no default
    }
  }
}
