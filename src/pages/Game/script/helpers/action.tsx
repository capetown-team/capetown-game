import { Direction } from '@game/script/Direction/Direction';
import { step, DirectionType } from '@game/script/helpers/constants';

export const right = new Direction(DirectionType.RIGHT, 4, 1.75, 1, 0);
export const left = new Direction(DirectionType.LEFT, 1.25, 0.75, -1, 0);
export const up = new Direction(DirectionType.UP, 1.75, 1.25, 0, -1);
export const down = new Direction(DirectionType.DOWN, 0.75, 0.25, 0, 1);

export const between = (value: number, min: number, max: number) => {
  return min <= value && value <= max;
};

export const toPixelPos = (gridPos: number) => {
  return gridPos * step;
};

export const buildWall = (
  context: CanvasRenderingContext2D,
  gridX: number,
  gridY: number,
  width: number,
  height: number
) => {
  context.fillRect(gridX, gridY, width, height);
};

export const buildBlock = (
  context: CanvasRenderingContext2D,
  gridX: number,
  gridY: number
) => {
  context.fillRect(gridX, gridY, step, step);
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
