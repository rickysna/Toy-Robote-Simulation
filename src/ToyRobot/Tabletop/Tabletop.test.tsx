import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import Tabletop from "./Tabletop";
import configureStore from "redux-mock-store";
import {StoreTypes} from "../../store";
import {tabletopInitialState} from "./reducer";
import {consoleInitialState} from "../Console/reducer";

const mockStore = configureStore<StoreTypes>([]);

it('should render Cell component according matrix state', function () {
  const store = mockStore({
    tabletop: tabletopInitialState,
    command: consoleInitialState
  });

  const testRenderer = renderer.create(
    <Provider store={store}>
      <Tabletop/>
    </Provider>
  );

  expect(testRenderer.root.findByProps({className: 'tabletop'}).children.length).toEqual(tabletopInitialState.matrix.size);
});