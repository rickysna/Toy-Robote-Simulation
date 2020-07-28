import {ADD_COMMAND, ICommandState, TCommandAction, WIPE_COMMANDS} from "./types";

export const consoleInitialState:ICommandState = {
  sequence: []
};

const reducer = (state = consoleInitialState, action: TCommandAction):ICommandState => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMAND:
      let sequence = state.sequence;
      if (payload) {
        sequence = [payload.command].concat(state.sequence);
      }
      return {
        sequence
      };
    case WIPE_COMMANDS:
      return {
        sequence: []
      };
    default:
      return state;
  }
};

export default reducer;