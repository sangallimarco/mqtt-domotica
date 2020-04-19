import React from "react";
import App from "./app";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});
