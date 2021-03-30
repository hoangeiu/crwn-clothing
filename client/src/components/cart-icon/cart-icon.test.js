import React from "react";
import { shallow } from "enzyme";

import { CartIcon } from "./cart-icon.component";

describe("CartIcon component", () => {
  let wrapper;
  let mocktToggleCartHidden;
  beforeEach(() => {
    mocktToggleCartHidden = jest.fn();

    const mockProps = {
      toggleCartHidden: mocktToggleCartHidden,
      itemCount: 0,
    };

    wrapper = shallow(<CartIcon {...mockProps} />);
  });

  it("should CartIcon render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call toggleCartHidden when icon is clicked", () => {
    wrapper.find(".cart-icon").simulate("click");
    expect(mocktToggleCartHidden).toHaveBeenCalled();
  });

  it("should render the itemCount as the text", () => {
    const itemCount = wrapper.find(".item-count").text();
    expect(itemCount.length).not.toBe(0);
  });
});
