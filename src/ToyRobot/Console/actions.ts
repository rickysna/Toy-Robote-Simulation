import {ADD_COMMAND, TCommandAction} from "./types";

export const addCommand = (value: string):TCommandAction => {
  return {
    type: ADD_COMMAND,
    payload: {
      command: {
        type: 'CMD',
        value
      }
    }
  }
};

export const addError = (value: string):TCommandAction => {
  return {
    type: ADD_COMMAND,
    payload: {
      command: {
        type: 'ERROR',
        value
      }
    }
  }
};