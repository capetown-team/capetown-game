import { Direction, DirectionType } from '@/pages/Game/Direction/Direction';

export const right = new Direction(DirectionType.right, 4, 1.75, 1, 0);
export const left = new Direction(DirectionType.left, 1.25, 0.75, -1, 0);
export const up = new Direction(DirectionType.up, 1.75, 1.25, 0, -1);
export const down = new Direction(DirectionType.down, 0.75, 0.25, 0, 1);
