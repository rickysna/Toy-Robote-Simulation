import {ITableTopState} from "../ToyRobot/Tabletop/types";
import {ICommandState} from "../ToyRobot/Console/types";

export { setupStore } from "./store";

export type StoreTypes = {tabletop: ITableTopState, command: ICommandState};