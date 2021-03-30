import React from "react";
import { shallow } from "enzyme";

import { CollectionItem } from "./collection-item.component";

describe("CollectionItem component", () => {
  let wrapper;
  let mockAddItem;
  let mockImageUrl = "www.test.com";
  let mockPrice = 300;
  let mockName = "Blue skirt";
  beforeEach(() => {
    mockAddItem = jest.fn();

    const mockProps = {
      item: {
        id: 1,
        name: mockName,
        price: mockPrice,
        imageUrl: mockImageUrl,
      },
      addItem: mockAddItem,
    };

    wrapper = shallow(<CollectionItem {...mockProps} />);
  });

  it("should CollectionItem render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call addItem when button is clicked", () => {
    wrapper.find("CustomButton").simulate("click");

    expect(mockAddItem).toHaveBeenCalled();
  });

  it("should render name correctly", () => {
    const name = wrapper.find(".name").text();

    expect(name).toBe(mockName);
  });
});
