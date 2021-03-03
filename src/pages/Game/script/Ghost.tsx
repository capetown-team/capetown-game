import { FigureType } from '@game/script/Types';
import { between } from '@game/script/helpers/action';
import ghostIcon from '@game/script/images/ghost-right.png';

export class Ghost {
  ghost = {
    posX: 250,
    posY: 280,
    radius: 10,
    image: new Image()
  };

  public ctx!: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawGhost() {
    this.ghost.image.src = ghostIcon;

    this.ctx.drawImage(
      this.ghost.image,
      this.ghost.posX,
      this.ghost.posY,
      this.ghost.radius,
      this.ghost.radius
    );
  }

  getCenterX() {
    return this.ghost.posX + this.ghost.radius;
  }
  getCenterY() {
    return this.ghost.posY + this.ghost.radius;
  }

  isTouch(pacman: FigureType, ghost: FigureType): boolean {
    return (
      between(
        pacman.posY + pacman.radius,
        this.getCenterY() - ghost.radius,
        this.getCenterY() + ghost.radius
      ) &&
      between(
        pacman.posX + pacman.radius,
        this.getCenterX() - ghost.radius,
        this.getCenterX() + ghost.radius
      )
    );
  }
}
