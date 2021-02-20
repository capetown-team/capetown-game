import { Direction } from '@game/script/Direction/Direction';

type Props = {
  direction: number;
  angle1: number;
  angle2: number;
  dirX: number;
  dirY: number;
};

export class DirectionWatch {
  dir: Props | null = null;

  set(dir: Direction | null) {
    this.dir = dir;
  }

  get() {
    return this.dir;
  }
}
