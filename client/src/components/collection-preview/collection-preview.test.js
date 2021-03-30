import React from "react";
import { shallow } from "enzyme";

import { CollectionPreview } from "./collection-preview.component";
import CollectionItem from "../collection-item/collection-item.component";

describe("CollectionPreview component", () => {
  let wrapper;
  let mockTitle;
  let mockItems;
  let mockHistory;
  let mockMatch;
  let mockRouteName;
  beforeEach(() => {
    mockTitle = "hats";
    mockItems = [];
    mockHistory = {
      push: jest.fn(),
    };
    mockMatch = {
      path: "/shop",
    };
    mockRouteName = "hats";

    const mockProps = {
      title: mockTitle,
      items: mockItems,
      history: mockHistory,
      match: mockMatch,
      routeName: mockRouteName,
    };

    wrapper = shallow(<CollectionPreview {...mockProps} />);
  });

  it("should CollectionPreview render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call history.push when click on title", () => {
    wrapper.find(".title").simulate("click");

    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.path}/${mockRouteName}`
    );
  });

  it("should title renders uppercase", () => {
    const title = wrapper.find(".title").text();

    expect(title).toBe(mockTitle.toUpperCase());
  });

  describe("render correctly the number of items prop", () => {
    it("should render 4 CollectionItem component when items prop has more than 4 items ", () => {
      mockItems = [
        { id: 1, item: {} },
        { id: 2, item: {} },
        { id: 3, item: {} },
        { id: 4, item: {} },
        { id: 5, item: {} },
        { id: 6, item: {} },
      ];
      const mockProps = {
        title: mockTitle,
        items: mockItems,
        history: mockHistory,
        match: mockMatch,
        routeName: mockRouteName,
      };
      wrapper = shallow(<CollectionPreview {...mockProps} />);

      expect(wrapper.find(CollectionItem).length).toEqual(4);
    });

    it("should render an equal number of CollectionItem component when items prop has less than 4 items", () => {
      mockItems = [
        { id: 1, item: {} },
        { id: 2, item: {} },
        { id: 3, item: {} },
      ];
      const mockProps = {
        title: mockTitle,
        items: mockItems,
        history: mockHistory,
        match: mockMatch,
        routeName: mockRouteName,
      };
      wrapper = shallow(<CollectionPreview {...mockProps} />);

      expect(wrapper.find(CollectionItem).length).toEqual(mockItems.length);
    });
  });
});
