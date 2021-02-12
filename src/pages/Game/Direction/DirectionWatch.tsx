import { Direction } from '@/pages/Game/Direction/Direction';

type Props = {
  direction: number;
  angle1: number;
  angle2: number;
  dirX: number;
  dirY: number;
};

export class DirectionWatch {
  dir: Props | null = null;

  set(dir: Direction) {
    this.dir = dir;
  }

  get() {
    return this.dir;
  }
}
