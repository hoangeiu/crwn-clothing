import React from "react";
import { shallow } from "enzyme";

import WithSpinner from "./with-spinner.component";
import Spinner from "../spinner/spinner.component";

describe("WithSpinner HOC", () => {
  const TestComponent = () => <div className="test" />;
  const WrapperComponent = WithSpinner(TestComponent);

  describe("if loading is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<WrapperComponent isLoading={true} />);
    });

    it("should render Spinner component", () => {
      expect(wrapper.exists(Spinner)).toBeTruthy();
    });

    it("should not render component", () => {
      expect(wrapper.exists(TestComponent)).toBeFalsy();
    });
  });

  describe("if loading is false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<WrapperComponent isLoading={false} />);
    });

    it("should render Spinner component", () => {
      expect(wrapper.exists(Spinner)).toBeFalsy();
    });

    it("should not render component", () => {
      expect(wrapper.exists(TestComponent)).toBeTruthy();
    });
  });
});
