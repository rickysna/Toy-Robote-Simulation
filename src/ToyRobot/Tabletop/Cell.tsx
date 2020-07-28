import React from "react";
import {TDirections} from "./types";

export interface ICellProps {
  isActive: boolean,
  direction: TDirections
}

export default React.memo(function ({isActive, direction}: ICellProps) {
  let extraClasses = isActive ? ` tabletop-cell__active tabletop-cell__${direction.toLowerCase()}` : "";

  return (
    <div className={`tabletop-cell${extraClasses}`}/>
  )
});