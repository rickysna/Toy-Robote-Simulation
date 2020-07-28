import React, {ChangeEvent} from "react";
import Wrapper, {IComponentProps} from "./Wrapper";
import {fileReader} from "../tools";

export const Component = React.memo(({ onCommandSubmit }: IComponentProps) => {
  const handler = function(event: ChangeEvent<HTMLInputElement>) {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];

      fileReader()(file).then((txt) => {
        if (typeof txt === "string") {
          return txt.split(/\n/);
        }
      }).then((sequence) => {
        if (sequence && sequence.length > 0) {
          sequence.forEach(command => onCommandSubmit(command));
        }
      });
    }
  };

  return (
    <input
      type="file"
      accept=".txt"
      multiple={false}
      onChange={handler}
    />
  )
});

export default Wrapper(Component);