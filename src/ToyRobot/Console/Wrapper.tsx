import React from "react";
import {connect as connectWithRedux, ConnectedProps} from "react-redux";
import {StoreTypes} from "../../store";
import {Dispatch} from "redux";
import {TAdiosBoundary, TDirections} from "../Tabletop/types";
import {updateRobotDirection, updateRobotPosition} from "../Tabletop/actions";
import {TCommandSequence, TRotateCommand} from "./types";
import {addCommand, addError} from "./actions";
import {getNewDirection} from "../tools";

export interface IComponentProps {
  onCommandSubmit: (command: string) => void;
  commands: TCommandSequence;
}

export default (
  Component: React.ComponentType<IComponentProps>
) => {
  class CommandWrapper extends React.Component<PropsFromRedux> {

    constructor(props: PropsFromRedux) {
      super(props);

      this.onCommandSubmit = this.onCommandSubmit.bind(this);
    }
    render() {
      const { commands, ...props } = this.props;
      return (
        <Component
          {...props}
          onCommandSubmit={this.onCommandSubmit}
          commands={commands}
        />
      )
    }
    onCommandSubmit(command: string) {
      command = command.trim().toUpperCase();
      if (command.length > 0) {
        const identifier = command.split(" ")[0];

        if (/^PLACE/i.test(identifier)) {
          return this.handlePlaceOrder(command);
        }

        if (!this.props.robotPlaced) {
          return this.handleError("Place robot on tabletop before you run another command!");
        }

        if (/^OUTPUT$/i.test(identifier)) {
          return this.handleOutputOrder();
        }

        if (/^MOVE$/i.test(identifier)) {
          return this.handleMoveOrder(identifier);
        }

        if (/^(LEFT|RIGHT)$/i.test(identifier)) {
          return this.handleRedirectOrder(identifier as TRotateCommand);
        }

        return this.handleError("Undefined Command detected!");
      }
    }
    handlePlaceOrder(command: string) {
      const result = command.match(/^PLACE\s+(([0-4],){2})(NORTH|SOUTH|WEST|EAST)$/i);
      if (result !== null) {
        const [, rawAxis, , direction] = result;
        const [rawX, rawY] = rawAxis.split(",");
        const newX = Number(rawX) as TAdiosBoundary;
        const newY = Number(rawY) as TAdiosBoundary;
        const newDirection = direction.toUpperCase() as TDirections;
        this.props.onPlaceRobot(newX, newY, newDirection);
        this.storeCommand(command);
      } else {
        return this.handleError(`invalid command: ${command}`);
      }
    }
    handleMoveOrder(identifier: string) {
      const {
        robotDirection,
        tabletopMinX,
        tabletopMaxX,
        tabletopMinY,
        tabletopMaxY,
        robotX,
        robotY,
      } = this.props;
      const moveAtX = robotDirection === "WEST" || robotDirection === "EAST";
      const moveAtY = !moveAtX;
      let newX:TAdiosBoundary = robotX, newY:TAdiosBoundary = robotY;
      let error = null;

      if (moveAtX) {
        if (robotDirection === "WEST" && robotX > tabletopMinX) {
          newX = robotX - 1 as TAdiosBoundary;
        } else if (robotDirection === "EAST" && robotX < tabletopMaxX) {
          newX = robotX + 1 as TAdiosBoundary;
        } else {
          error = `unable to move robot on ${robotDirection}`;
        }
      }

      if (moveAtY) {
        if (robotDirection === "SOUTH" && robotY > tabletopMinY) {
          newY = robotY - 1 as TAdiosBoundary;
        } else if (robotDirection === "NORTH" && robotY < tabletopMaxY) {
          newY = robotY + 1 as TAdiosBoundary;
        } else {
          error = `unable to move robot on ${robotDirection}`;
        }
      }

      if (error) {
        this.handleError(error);
      } else {
        this.props.onPlaceRobot(newX, newY, robotDirection);
      }

      this.storeCommand(identifier);
    }
    handleRedirectOrder(identifier: TRotateCommand) {
      const newDirection = getNewDirection(this.props.robotDirection, identifier);
      this.props.onRedirect(newDirection);
      this.storeCommand(identifier);
    }
    handleOutputOrder() {
      const {robotX, robotY, robotDirection} = this.props;
      this.storeCommand(`OUTPUT:PLACE ${robotX},${robotY},${robotDirection}`);
    }
    handleError(message: string) {
      this.props.onErrorCapture(message);
    }
    storeCommand(command: string) {
      this.props.onAddCommand(command);
    }
  }

  const mapReduxStateToProps = (state: StoreTypes) => ({
    commands: state.command.sequence,
    robotDirection: state.tabletop.direction,
    robotX: state.tabletop.rx,
    robotY: state.tabletop.ry,
    tabletopMinX: state.tabletop.minX,
    tabletopMaxX: state.tabletop.maxX,
    tabletopMinY: state.tabletop.minY,
    tabletopMaxY: state.tabletop.maxY,
    robotPlaced: state.tabletop.robotPlaced
  });

  const mapReduxDispatchToProps = (dispatch: Dispatch) => ({
    onPlaceRobot:
      (...args: [TAdiosBoundary, TAdiosBoundary, TDirections]) => dispatch(updateRobotPosition.apply(null, args)),
    onRedirect:
      (direction: TDirections) => dispatch(updateRobotDirection(direction)),
    onAddCommand:
      (message: string) => dispatch(addCommand(message)),
    onErrorCapture:
      (message: string) => dispatch(addError(message)),
  });

  const connector = connectWithRedux(
    mapReduxStateToProps,
    mapReduxDispatchToProps
  );

  type PropsFromRedux = ConnectedProps<typeof connector>;

  return connector(CommandWrapper);
}