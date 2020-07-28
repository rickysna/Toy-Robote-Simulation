import React from "react";
import {shallow} from "enzyme";
import {Component} from "./CmdInput";

test("the input should invoke function after pressing Enter key", () => {
  const submitTestFn = jest.fn((command: string) => command);

  const component = shallow(<Component onCommandSubmit={submitTestFn} commands={[]}/>);

  component
    .find("input")
    .simulate('keyUp', {
      key: 'Enter',
      keyCode: 13,
      target: { value: "This is a test" }
    });

  expect(submitTestFn.mock.results[0].value).toBe("This is a test");
});