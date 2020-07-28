import React from 'react';
import App from "./App";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {StoreTypes} from "./store";
import {tabletopInitialState} from "./ToyRobot/Tabletop/reducer";
import {consoleInitialState} from "./ToyRobot/Console/reducer";
import ToyRobot from "./ToyRobot/ToyRobot";
import {Provider} from "react-redux";

const mockStore = configureStore<StoreTypes>([]);

it('should render Provider and ToyRobot component', function () {
  const store = mockStore({
    command: consoleInitialState,
    tabletop: tabletopInitialState
  });

  const testRenderer = renderer.create(
    <App reduxStore={store}/>
  );

  expect(testRenderer.root.find(node => node.type === Provider)).toBeTruthy();
  expect(testRenderer.root.find(node => node.type === ToyRobot)).toBeTruthy();
});