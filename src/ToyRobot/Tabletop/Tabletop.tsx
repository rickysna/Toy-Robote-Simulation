import React from "react";
import {StoreTypes} from "../../store";
import {useSelector} from "react-redux";
import "./style.scss";
import Cell from "./Cell";

export default function() {
  const { matrix, direction } = useSelector((state: StoreTypes) => ({
    matrix: state.tabletop.matrix,
    direction: state.tabletop.direction
  }));

  const cells = [];

  for (let [key, cell] of matrix) {
    cells.push(<Cell key={key} direction={direction} isActive={cell.active}/>)
  }

  return (
    <div className="tabletop">
      {cells}
    </div>
  )
}