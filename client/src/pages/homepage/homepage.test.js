import React from "react";
import { shallow } from "enzyme";

import HomePage from "./homepage.component";

it("should HomePage render without error", () => {
  expect(shallow(<HomePage />)).toMatchSnapshot();
});
