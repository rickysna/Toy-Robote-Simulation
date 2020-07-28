import React from "react";
import Console from "./Console";
import Tabletop from "./Tabletop";
import "./style.scss";

export default function() {
  return (
    <React.Fragment>
      <h1>This is a robot game</h1>
      <div className="app-container">
        <Tabletop/>
        <Console/>
      </div>
    </React.Fragment>
  )
}