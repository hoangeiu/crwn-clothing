import React from "react";
import { shallow } from "enzyme";

import { FormInput } from "./form-input.component";

describe("FormInput component", () => {
  let wrapper;
  let mockHandleChange;
  let mockLabel;
  beforeEach(() => {
    mockHandleChange = jest.fn();
    mockLabel = "email";

    const mockProps = {
      label: mockLabel,
      value: "test@gmail.com",
      handleChange: mockHandleChange,
    };

    wrapper = shallow(<FormInput {...mockProps} />);
  });

  it("should FormInput render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleChange when input changes", () => {
    wrapper.find(".form-input").simulate("change");

    expect(mockHandleChange).toHaveBeenCalled();
  });

  describe("check label", () => {
    it("should render label if there is a label", () => {
      expect(wrapper.exists(".form-input-label")).toBeTruthy();
      expect(wrapper.find(".form-input-label").text()).toBe(mockLabel);
    });

    it("should not render label if there is no label", () => {
      mockLabel = "";
      const mockProps = {
        label: mockLabel,
        value: "test@gmail.com",
        handleChange: mockHandleChange,
      };

      wrapper = shallow(<FormInput {...mockProps} />);

      expect(wrapper.exists(".form-input-label")).toBeFalsy();
    });
  });
});
