import { FigureType, InitParameters } from '@game/script/Types';
import { up, between } from '@game/script/helpers/action';

import { moveClass } from '@game/script/moveClass';
import ghostright from '@game/script/images/ghost-right.jpg';
import ghostleft from '@game/script/images/ghost-left.jpg';

type Map = { posY: { row: number; posX: { col: number; type: string }[] }[] };

export class Ghost extends moveClass {
  initParameters: InitParameters;
  ghost = {
    posX: 260,
    posY: 290,
    radius: 20,
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
    this.ghost.image.src = ghostright;
    if (this.direction === 2) this.ghost.image.src = ghostleft;

    this.ctx.drawImage(
      this.ghost.image,
      this.posX,
      this.posY,
      this.radius,
      this.radius
    );
  }

  getCenterX() {
    return this.posX + this.radius;
  }
  getCenterY() {
    return this.posY + this.radius;
  }

  isTouch(pacman: FigureType): boolean {
    return (
      between(
        pacman.posY + pacman.radius,
        this.getCenterY() - this.radius,
        this.getCenterY() + this.radius
      ) &&
      between(
        pacman.posX + pacman.radius,
        this.getCenterX() - this.radius,
        this.getCenterX() + this.radius
      )
    );
  }
}
