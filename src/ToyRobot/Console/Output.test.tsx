import React from "react";
import renderer from "react-test-renderer";
import { OutputComponent } from "./Output";
import {ICommand} from "./types";

describe("test Output component", function () {

  it('should render default message', function () {
    const commands = [] as ICommand[];
    const testRenderer = renderer.create(<OutputComponent commands={commands} onCommandSubmit={() => null}/>);

    expect(testRenderer.root.find(node => node.children[0] === "no command submitted")).toBeTruthy();
  });

  it('should render a list', function () {
    const commands = [{
      type: "CMD",
      value: "it's a test"
    }] as ICommand[];

    const testRenderer = renderer.create(<OutputComponent commands={commands} onCommandSubmit={() => null}/>);

    expect(testRenderer.root.findByType("p").children.length).toEqual(1);
  });
});