import React from "react";
import App from "./app";
import { shallow } from "enzyme";
import { TestComponent } from "./test.component";

it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists(TestComponent)).toBeTruthy();
});
