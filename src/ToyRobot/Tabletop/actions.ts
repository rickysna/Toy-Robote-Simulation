import {TAdiosBoundary, TDirections, TRobotAction, UPDATE_ROBOT_DIRECTION, UPDATE_ROBOT_POSITION} from "./types";

export const updateRobotPosition = (
  rx: TAdiosBoundary,
  ry: TAdiosBoundary,
  direction: TDirections,
):TRobotAction => {
  return {
    type: UPDATE_ROBOT_POSITION,
    payload: {
      rx, ry, direction
    }
  }
};

export const updateRobotDirection = (
  direction: TDirections,
) => {
  return {
    type: UPDATE_ROBOT_DIRECTION,
    payload: {
      direction
    }
  }
};