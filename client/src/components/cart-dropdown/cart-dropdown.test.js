import React from "react";
import { shallow } from "enzyme";

import { CartDropdown } from "./cart-dropdown.component";
import CartItem from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

describe("CartDropdown component", () => {
  let wrapper;
  let mockHistory;
  let mockDispatch;
  const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };

    mockDispatch = jest.fn();

    const mockProps = {
      cartItems: mockCartItems,
      history: mockHistory,
      dispatch: mockDispatch,
    };

    wrapper = shallow(<CartDropdown {...mockProps} />);
  });

  it("should CardDropdown renders without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render an equal number of CardItem components as the cardItems prop", () => {
    expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
  });

  it("should render empty message if cardItems is empty", () => {
    const mockProps = {
      cartItems: [],
      history: mockHistory,
      dispatch: mockDispatch,
    };

    wrapper = shallow(<CartDropdown {...mockProps} />);

    expect(wrapper.exists(".empty-message")).toBe(true);
  });

  it("should call history.push when button is clicked", () => {
    wrapper.find("CustomButton").simulate("click");
    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
  });
});
