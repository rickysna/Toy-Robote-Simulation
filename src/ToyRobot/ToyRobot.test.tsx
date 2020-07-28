import React from "react";
import Console from "./Console";
import Tabletop from "./Tabletop";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {StoreTypes} from "../store";
import {tabletopInitialState} from "./Tabletop/reducer";
import {consoleInitialState} from "./Console/reducer";
import ToyRobot from "./ToyRobot";

const mockStore = configureStore<StoreTypes>([]);

it('should render Tabletop && Console Component', function () {
  let store = mockStore({
    tabletop: tabletopInitialState,
    command: consoleInitialState
  });

  const testRenderer = renderer.create(
    <Provider store={store}>
      <ToyRobot/>
    </Provider>
  );

  expect(testRenderer.root.find(node => node.type === Console)).toBeTruthy();
  expect(testRenderer.root.find(node => node.type === Tabletop)).toBeTruthy();
});