import { Direction } from '@game/script/Direction/Direction';
import { step, DirectionType } from '@game/script/helpers/constants';

export const up = new Direction(DirectionType.UP, 1.75, 1.25, 0, -1);
export const left = new Direction(DirectionType.LEFT, 1.25, 0.75, -1, 0);
export const down = new Direction(DirectionType.DOWN, 0.75, 0.25, 0, 1);
export const right = new Direction(DirectionType.RIGHT, 0.24, 1.75, 1, 0);

export const between = (value: number, min: number, max: number) => {
  return min <= value && value <= max;
};

export const toPixelPos = (gridPos: number) => {
  return gridPos * step;
};

export const drawText = (
  context: CanvasRenderingContext2D,
  text: string,
  size: string,
  color: string,
  x: number,
  y: number
) => {
  const textScore = text;
  context.font = `${size}pt Source Sans Pro`;
  context.fillStyle = color;
  context.fillText(textScore, x, y);
};

export const getRandomDir = (
  minPar: number,
  maxPar: number,
  directions: number[]
): number => {
  const min = Math.ceil(minPar);
  const max = Math.floor(maxPar);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  if (directions.includes(result)) {
    return getRandomDir(min, max, directions);
  }
  return result;
};

export const nextDir = (directions: number[]) => {
  return getRandomDir(0, 3, directions);
};

export const setDirectionGhost = (newDir: number) => {
  let r: Direction | null = null;

  switch (newDir) {
    case DirectionType.UP:
      r = up;
      break;
    case DirectionType.LEFT:
      r = left;
      break;
    case DirectionType.DOWN:
      // this.stop = true;
      r = down;
      break;
    case DirectionType.RIGHT:
      r = right;
      break;
    // no default
  }
  return r;
};
