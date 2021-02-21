export type InitParameters = {
  width: number;
  height: number;
  head: number;
  borderWalls: number;
};

export type ObjectType = {
  [key: string]: number | string;
};

export type FigureType = {
  posX: number;
  posY: number;
  radius: number;
  direction?: number;
};
