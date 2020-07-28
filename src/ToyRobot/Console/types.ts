export type TRotateCommand = 'LEFT' | 'RIGHT';
export type TCommandTypes = 'CMD' | 'ERROR';

export interface ICommand {
  type: TCommandTypes,
  value: string
}

export type TCommandSequence = ICommand[];

export interface ICommandState {
  sequence: TCommandSequence
}

export const ADD_COMMAND = "ADD_COMMAND";
export const WIPE_COMMANDS = "WIPE_COMMANDS";

export type TCommandAction<P = any> = {
  type: typeof ADD_COMMAND | typeof WIPE_COMMANDS | string,
  payload?: P
}