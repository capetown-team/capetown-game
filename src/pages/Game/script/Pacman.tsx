import { right } from '@game/script/helpers/action';
import { InitParameters } from '@game/script/Types';
import { moveClass, Map } from '@game/script/moveClass';

export class Pacman extends moveClass {
  initParameters: InitParameters;

  radius = 10;
  startX = 0;
  startY = 285;
  startDir = right;
  isCheckPill = true;
  isCheckBonus = true;

  speed = 1;
  stepMounth = 12;
  isMouthOpen = false;
  angle1 = right.angle1;
  angle2 = right.angle2;

  score = 0;

  constructor(initParameters: InitParameters, map: Map) {
    super(initParameters, map);
    this.initParameters = initParameters;

    this.startPosition();
    this.setMap(map);
  }

  reset(): void {
    this.startPosition();
    this.freeze();

    this.isMouthOpen = true;
    this.score = 0;
  }
}
