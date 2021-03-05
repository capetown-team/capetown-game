import { FigureType, InitParameters } from '@game/script/Types';
import { up, between } from '@game/script/helpers/action';

import { moveClass } from '@game/script/moveClass';
// import ghostIcon from '@game/script/images/react1.jpg';

type Map = { posY: { row: number; posX: { col: number; type: string }[] }[] };

export class Ghost extends moveClass {
  initParameters: InitParameters;
  ghost = {
    posX: 260,
    posY: 290,
    radius: 10,
    image: new Image()
  };

  public ctx!: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    initParameters: InitParameters,
    map: Map
  ) {
    super(initParameters, map);
    this.initParameters = initParameters;
    this.isCheckBonus = false;
    this.isCheckPill = false;
    this.isCheckCross = true;
    this.direction = up.direction;
    this.ctx = ctx;
  }

  drawGhost() {
    // this.ghost.image.src = ghostIcon;

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
