import {IMatrixCell, TAdiosBoundary, IMatrix, TDirections} from "./Tabletop/types";
import {TRotateCommand} from "./Console/types";

export const generateMatrix = function (x: TAdiosBoundary, y: TAdiosBoundary):IMatrix {
  const cells:IMatrix = new Map();

  for (let _y = y; _y >= 0; _y--) {
    for (let _x = 0; _x <= x; _x++) {
      const cell:IMatrixCell = {
        x: _x as TAdiosBoundary,
        y: _y as TAdiosBoundary,
        active: false
      };
      cells.set(`${_x}:${_y}`,cell);
    }
  }

  return cells;
};

export const getNewDirection = (
  direction: TDirections,
  turn: TRotateCommand,
):TDirections => {
  const directions:TDirections[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  const index = directions.indexOf(direction);
  const offset = turn === "LEFT" ? -1 : 1;

  return directions[index + offset] || directions[directions.length - Math.abs(index + offset)];
};

export const fileReader = (): (file: Blob, encoding?: string) => Promise<string|ArrayBuffer> => {
  const reader = new FileReader();
  return function(file, encoding: string = "UTF-8") {
    reader.readAsText(file, encoding);
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        if (event && event.target && event.target.result) {
          resolve(event.target.result);
        } else {
          reject();
        }
      }
    });
  };
};