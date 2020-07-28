import React from "react";
import Wrapper, {IComponentProps} from "./Wrapper";

export const OutputComponent = React.memo(({ commands }: IComponentProps) => {
  return (
    <div className="output">
      <div className="output-list-container">
        {
          commands.map((command, index) =>
          <p key={index} className="output-item">{command.value}</p>)
        }
        {
          commands.length === 0 && (<p className="output-item">no command submitted</p>)
        }
      </div>
    </div>
  )
});

export default Wrapper(OutputComponent);