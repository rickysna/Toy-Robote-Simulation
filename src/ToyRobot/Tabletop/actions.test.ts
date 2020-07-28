import {UPDATE_ROBOT_DIRECTION, UPDATE_ROBOT_POSITION} from "./types";
import {updateRobotDirection, updateRobotPosition} from "./actions";
import {tabletopInitialState} from "./reducer";

it("test tabletop redux's actions", function () {
  const { rx, ry, direction } = tabletopInitialState;
  expect(updateRobotPosition(rx, ry, direction)).toEqual({
    type: UPDATE_ROBOT_POSITION,
    payload: {
      rx, ry, direction
    }
  });
  expect(updateRobotDirection("NORTH")).toEqual({
    type: UPDATE_ROBOT_DIRECTION,
    payload: {
      direction: "NORTH"
    }
  });
});