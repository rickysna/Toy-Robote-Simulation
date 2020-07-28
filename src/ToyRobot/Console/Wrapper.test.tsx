import React from "react";
import Wrapper, {IComponentProps} from "./Wrapper";
import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import {StoreTypes} from "../../store";
import {tabletopInitialState} from "../Tabletop/reducer";
import {consoleInitialState} from "./reducer";
import {Provider} from "react-redux";
import renderer, {ReactTestRenderer} from "react-test-renderer";
import {addCommand, addError} from "./actions";
import {updateRobotDirection, updateRobotPosition} from "../Tabletop/actions";
import {TAdiosBoundary, TDirections} from "../Tabletop/types";
import {getNewDirection} from "../tools";

const mockStore = configureStore<StoreTypes>([]);

function getInitialEnv(
  TestComponent: React.ComponentType<IComponentProps>,
  storeData: StoreTypes = {
    tabletop: tabletopInitialState,
    command: consoleInitialState
  }
):[MockStoreEnhanced, renderer.ReactTestInstance] {
  let testComponentInstance: renderer.ReactTestInstance;
  let WrappedComponent = Wrapper(TestComponent);
  let store: MockStoreEnhanced;
  let testRenderer:ReactTestRenderer;

  store = mockStore(storeData);

  testRenderer = renderer.create(
    <Provider store={store}>
      <WrappedComponent/>
    </Provider>
  );

  testComponentInstance = testRenderer.root.findByType(TestComponent);

  return [store, testComponentInstance];
}

describe("test console board wrapper, it's a HOC component", () => {
  let TestComponent: React.ComponentType<IComponentProps> = () => <div/>;
  let store: MockStoreEnhanced;
  let testComponentInstance:renderer.ReactTestInstance;

  describe("test commands which allows to use before robot been placed", function() {
    beforeEach(() => {
      [store, testComponentInstance] = getInitialEnv(TestComponent);
    });

    it('should render TestComponent', function () {
      expect(testComponentInstance).toBeTruthy();
    });

    it('should pass two methods to TestComponent', function() {
      expect(testComponentInstance.props.commands instanceof Array).toBeTruthy();
      expect(testComponentInstance.props.onCommandSubmit instanceof Function).toBeTruthy();
    });

    it('should return an error when I submit a command which is not PLACE', function () {
      testComponentInstance.props.onCommandSubmit('MOVE');

      const actions = store.getActions();

      expect(actions).toEqual([addError('Place robot on tabletop before you run another command!')]);
    });

    it('should return an error when I place robot out of the tabletop', function () {
      const {maxX, maxY} = tabletopInitialState;
      const direction = "SOUTH";
      const command = `PLACE ${maxX + 1},${maxY},${direction}`;

      testComponentInstance.props.onCommandSubmit(command);

      const actions = store.getActions();

      expect(actions).toEqual([addError(`invalid command: ${command}`)]);
    });

    it('should init robot when I submit PLACE command', function () {
      const {minX, minY} = tabletopInitialState;
      const direction:TDirections = "SOUTH";
      const command = `PLACE ${minX},${minY},${direction}`;

      testComponentInstance.props.onCommandSubmit(command);

      const actions = store.getActions();

      expect(actions).toEqual([
        updateRobotPosition(minX, minY, direction),
        addCommand(command)
      ]);
    });
  });

  describe("test commands which allows to use after robot placed", function() {
    beforeEach(() => {
      const state = Object.assign({}, tabletopInitialState, {
        robotPlaced:  true
      });
      [store, testComponentInstance] = getInitialEnv(TestComponent, {
        tabletop: state,
        command: consoleInitialState
      });
    });

    it('should move the robot to the next dimension', function () {
      const {minX, minY} = tabletopInitialState;
      const direction:TDirections = tabletopInitialState.direction;

      testComponentInstance.props.onCommandSubmit("MOVE");
      const actions = store.getActions();

      expect(actions).toEqual([
        updateRobotPosition(minX + 1 as TAdiosBoundary, minY, direction),
        addCommand('MOVE')
      ]);
    });

    it('should redirect robot', function () {
      const direction:TDirections = tabletopInitialState.direction;

      testComponentInstance.props.onCommandSubmit("LEFT");
      testComponentInstance.props.onCommandSubmit("RIGHT");
      const actions = store.getActions();

      expect(actions).toEqual([
        updateRobotDirection(getNewDirection(direction, "LEFT")),
        addCommand("LEFT"),
        updateRobotDirection(getNewDirection(direction, "RIGHT")),
        addCommand("RIGHT"),
      ]);
    });

    it('should output current robot position', function () {
      testComponentInstance.props.onCommandSubmit("OUTPUT");
      const actions = store.getActions();
      const { rx, ry, direction } = tabletopInitialState;

      expect(actions).toEqual([
        addCommand(`OUTPUT:PLACE ${rx},${ry},${direction}`),
      ]);
    });
  });

  describe("test limitation of moving robot out of the tabletop", function () {
    const state = Object.assign({}, tabletopInitialState, {
      robotPlaced:  true,
      direction: "SOUTH"
    });
    let [store, testComponentInstance] = getInitialEnv(TestComponent, {
      tabletop: state,
      command: consoleInitialState
    });

    it('should return an error', function () {
      testComponentInstance.props.onCommandSubmit("MOVE");

      const actions = store.getActions();

      expect(actions).toEqual([
        addError(`unable to move robot on SOUTH`),
        addCommand("MOVE")
      ]);
    });
  });
});