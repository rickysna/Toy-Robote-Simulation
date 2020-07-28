import {ADD_COMMAND, TCommandAction} from "./types";
import {addCommand, addError} from "./actions";

it("test Console redux's actions", function () {
  expect(addCommand('to add a command')).toEqual({
    type: ADD_COMMAND,
    payload: {
      command: {
        value: 'to add a command',
        type: 'CMD',
      }
    }
  });
  expect(addError('to add an error message')).toEqual({
    type: ADD_COMMAND,
    payload: {
      command: {
        value: 'to add an error message',
        type: 'ERROR',
      }
    }
  });
});