import React, { Component } from "react";
import CommandInput from "./CmdInput";
import UploadBtn from "./UploadBtn";
import Output from "./Output";
import "./style.scss";

export default class Console extends Component {
  render() {
    return (
      <div className="command-board">
        <Output/>
        <CommandInput/>
        <UploadBtn/>
      </div>
    )
  }
}