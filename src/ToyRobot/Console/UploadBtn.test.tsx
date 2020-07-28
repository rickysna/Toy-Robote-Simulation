import React from "react";
import {shallow} from "enzyme";
import {Component} from "./UploadBtn";

const txtBlob = new Blob([
  'test1\ntest2\ntest3'
], {type: "text/plain"});

test("the input should take a txt file and return an array", () => {
  const submitTestFn = jest.fn((command: string) => command);

  const component = shallow(<Component onCommandSubmit={submitTestFn} commands={[]}/>);

  component
    .find("input")
    .simulate('change', {
      target: {
        files: [txtBlob]
      }
    });

  setTimeout(() => {
    expect(submitTestFn.mock.calls.length).toBe(3);
    expect(submitTestFn.mock.results[0].value).toBe("test1");
    expect(submitTestFn.mock.results[1].value).toBe("test2");
    expect(submitTestFn.mock.results[2].value).toBe("test3");
  }, 200);
});