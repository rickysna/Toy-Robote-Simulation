import reducer, {consoleInitialState} from "./reducer";
import {addCommand, addError} from "./actions";

describe('test Console redux\'s reducer', function () {
  it('should return default state', function () {
    expect(reducer(undefined, {type: 'test'})).toEqual(consoleInitialState);
  });

  it('should return a new state', function () {
    expect(reducer(undefined,  addCommand("test"))).toEqual({
      sequence: [
        {
          value: "test",
          type: "CMD"
        }
      ]
    });

    expect(reducer(undefined,  addError("test"))).toEqual({
      sequence: [
        {
          value: "test",
          type: "ERROR"
        }
      ]
    })
  });
});