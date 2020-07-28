import React, {useCallback} from "react";
import Wrapper, {IComponentProps} from "./Wrapper";

export const Component = React.memo(({onCommandSubmit}: IComponentProps) => {
  const handler = useCallback(function(event: any) {
    if (
      event.key === "Enter"
      && event.keyCode === 13
      && event.target.value.length > 0
    ) {
      const input = event.target.value;
      onCommandSubmit(input);
      event.target.value = "";
    }
  }, [onCommandSubmit]);
  return (
    <div className="cmd-input">
      <input type="text" placeholder="press enter to submit command" onKeyUp={handler}/>
    </div>
  )
});

export default Wrapper(Component);