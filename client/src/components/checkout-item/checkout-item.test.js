import React from "react";
import { shallow } from "enzyme";

import { CheckoutItem } from "./checkout-item.component";

const findTestByAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

describe("CheckoutItem component", () => {
  let wrapper;
  let mockClearItem;
  let mockAddItem;
  let mockRemoveItem;
  beforeEach(() => {
    mockClearItem = jest.fn();
    mockAddItem = jest.fn();
    mockRemoveItem = jest.fn();

    const mockProps = {
      cartItem: {
        name: "Gucci hat",
        imageUrl: "www.test.com",
        price: 100,
        quantity: 5,
      },
      clearItem: mockClearItem,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
    };

    wrapper = shallow(<CheckoutItem {...mockProps} />);
  });

  it("should CheckoutItem renders without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call removeItem when button is clicked", () => {
    // wrapper.find(".quantity").childAt(0).simulate("click");
    const removeButton = findTestByAttr(wrapper, "removeItem");
    removeButton.simulate("click");

    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it("should call addItem when button is clicked", () => {
    // wrapper.find(".quantity").childAt(2).simulate("click");
    const addButton = findTestByAttr(wrapper, "addItem");
    addButton.simulate("click");

    expect(mockAddItem).toHaveBeenCalled();
  });

  it("should call clearItem when button is click", () => {
    wrapper.find(".remove-button").simulate("click");

    expect(mockClearItem).toHaveBeenCalled();
  });
});
