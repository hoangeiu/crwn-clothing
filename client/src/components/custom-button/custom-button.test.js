import React from "react";
import { shallow } from "enzyme";

import { CustomButton } from "./custom-button.component";

describe("CustomButton component", () => {
  let wrapper;
  let mockChildren;
  let mockiIsGoogleSignIn;
  let mockInverted;
  beforeEach(() => {
    mockChildren = "Sign in with Google";
    mockiIsGoogleSignIn = false;
    mockInverted = false;

    const mockProps = {
      children: mockChildren,
      isGoogleSignIn: mockiIsGoogleSignIn,
      inverted: mockInverted,
    };

    wrapper = shallow(<CustomButton {...mockProps} />);
  });

  it("should CustomButton renders without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should has inverted class when inverted prop is true", () => {
    mockInverted = true;

    wrapper = shallow(<CustomButton {...{ inverted: mockInverted }} />);

    expect(wrapper.exists(".inverted")).toBeTruthy;
  });

  it("should has google-sign-in class when isGoogleSignIn prop is true", () => {
    wrapper = shallow(<CustomButton {...{ isGoogleSignIn: true }} />);

    expect(wrapper.exists(".google-sign-in")).toBeTruthy();
  });

  it("should render children", () => {
    expect(wrapper.find("button").text()).toBe(mockChildren);
  });
});
