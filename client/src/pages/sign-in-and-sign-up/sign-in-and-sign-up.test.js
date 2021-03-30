import React from "react";
import { shallow } from "enzyme";

import SignInAndSignUpPage from "./sign-in-and-sign-up.component";

it("should SignInAndSignUpPage component render without error", () => {
  expect(shallow(<SignInAndSignUpPage />)).toMatchSnapshot();
});
