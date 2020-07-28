import {
  UPDATE_ROBOT_POSITION,
  UPDATE_ROBOT_DIRECTION,
  ITableTopState,
  TRobotAction
} from "./types";
import { generateMatrix } from "../tools";

export const tabletopInitialState:ITableTopState = {
  rx: 0,
  ry: 0,
  minX: 0,
  maxX: 4,
  minY: 0,
  maxY: 4,
  direction: 'EAST',
  robotPlaced: false,
  matrix: generateMatrix(4, 4)
};

const reducer = (state = tabletopInitialState, action: TRobotAction):ITableTopState => {
  const { type, payload } = action;

  let {rx, ry, direction} = tabletopInitialState;

  switch (type) {
    case UPDATE_ROBOT_POSITION:
      if (payload) {
        rx = payload.rx;
        ry = payload.ry;
        direction = payload.direction;
      }
      const nextCell = state.matrix.get(`${rx}:${ry}`);
      const currCell = state.matrix.get(`${state.rx}:${state.ry}`);

      if (currCell !== undefined) {
        currCell.active = false;
      }

      if (nextCell !== undefined) {
        nextCell.active = true;
      }

      return {
        ...state,
        rx, ry, direction,
        robotPlaced: true,
        matrix: state.matrix
      };
    case UPDATE_ROBOT_DIRECTION:
      return {
        ...state,
        direction: payload ? payload.direction : direction
      };
    default:
      return state;
  }
};

export default reducer;