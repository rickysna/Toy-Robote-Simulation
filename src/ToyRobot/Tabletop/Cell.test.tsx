import React from "react";
import renderer from "react-test-renderer";
import Cell from "./Cell";

describe("test cell component, ", function () {
  it('should render a cell component with custom classNames', function () {
    const testRenderer = renderer.create(<Cell isActive direction="NORTH"/>);

    expect(testRenderer.root.findByType("div").props.className).toEqual('tabletop-cell tabletop-cell__active tabletop-cell__north');
  });

  it('should render a cell component with default classNames', function () {
    const testRenderer = renderer.create(<Cell isActive={false} direction="NORTH"/>);

    expect(testRenderer.root.findByType("div").props.className).toEqual('tabletop-cell');
  });
});