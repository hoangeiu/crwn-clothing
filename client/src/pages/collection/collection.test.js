import React from "react";
import { shallow } from "enzyme";

import { CollectionPage } from "./collection.component";
import CollectionItem from "../../components/collection-item/collection-item.component";

let wrapper;
let mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
beforeEach(() => {
  const mockCollection = {
    title: "hats",
    items: mockItems,
  };

  wrapper = shallow(<CollectionPage collection={mockCollection} />);
});

it("should CollectionPage render without error", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should render an equal number of CollectionItem as collection prop", () => {
  expect(wrapper.find(CollectionItem).length).toEqual(mockItems.length);
});
