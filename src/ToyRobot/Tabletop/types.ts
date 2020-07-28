export type TAdiosBoundary = 0|1|2|3|4;
export type TDirections = 'SOUTH' | 'WEST' | 'EAST' | 'NORTH';

export interface IMatrixCell {
  x: TAdiosBoundary,
  y: TAdiosBoundary,
  active: boolean
}

export type IMatrix = Map<string, IMatrixCell>;

export interface ITableTopState {
  rx: TAdiosBoundary,
  ry: TAdiosBoundary,
  minX: TAdiosBoundary,
  maxX: TAdiosBoundary,
  minY: TAdiosBoundary,
  maxY: TAdiosBoundary,
  direction: TDirections,
  matrix: IMatrix,
  robotPlaced: boolean
}

export const UPDATE_ROBOT_POSITION = "UPDATE_ROBOT_POSITION";
export const UPDATE_ROBOT_DIRECTION = "UPDATE_ROBOT_DIRECTION";

export type TRobotAction<P = any> = {
  type: typeof UPDATE_ROBOT_POSITION | typeof UPDATE_ROBOT_DIRECTION | string,
  payload: P
}