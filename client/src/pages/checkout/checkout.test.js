import React from "react";
import { shallow } from "enzyme";

import { CheckoutPage } from "./checkout.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

let wrapper;
let mockCartItems;
beforeEach(() => {
  mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const mockProps = {
    cartItems: mockCartItems,
    total: 100,
  };

  wrapper = shallow(<CheckoutPage {...mockProps} />);
});

it("should CheckoutPage render without error", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should render an equal number of CheckoutItem component as cartItems prop", () => {
  expect(wrapper.find(CheckoutItem).length).toEqual(mockCartItems.length);
});
