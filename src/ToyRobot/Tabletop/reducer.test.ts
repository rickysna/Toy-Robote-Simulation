import reducer, {tabletopInitialState} from "./reducer";
import {updateRobotDirection, updateRobotPosition} from "./actions";
import {TRobotAction} from "./types";

describe('test tabletop redux\'s reducer', function () {
  it('should return default state', function () {
    expect(reducer(undefined, {type: 'test'} as TRobotAction)).toEqual(tabletopInitialState);
  });

  it('should return new state', function () {
    const { rx, ry, direction } = tabletopInitialState;
    expect(reducer(undefined, updateRobotPosition(rx, ry, direction)))
      .toEqual(Object.assign({}, tabletopInitialState, {robotPlaced: true}));

    expect(reducer(undefined, updateRobotDirection(tabletopInitialState.direction)))
      .toEqual(tabletopInitialState);
  });
});