import { combineReducers } from "redux";
import tabletopReducer from "./Tabletop/reducer";
import commandReducer from "./Console/reducer";
import {StoreTypes} from "../store";

export default combineReducers<StoreTypes>({
  tabletop: tabletopReducer,
  command: commandReducer,
});