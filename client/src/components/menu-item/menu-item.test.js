import React from "react";
import { shallow } from "enzyme";

import { MenuItem } from "./menu-item.component";

describe("render MenuItem component", () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  let linkUrl = "/hats";
  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
    mockMatch = {
      url: "/shop",
    };

    const mockProps = {
      title: "hats",
      imageUrl: "www.test.com",
      size: "large",
      history: mockHistory,
      linkUrl,
      match: mockMatch,
    };

    wrapper = shallow(<MenuItem {...mockProps} />);
  });

  it("should MenuItem render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call history.push with the right string when menu-item is clicked", () => {
    wrapper.find(".menu-item").simulate("click");

    expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}${linkUrl}`);
  });

  //   it("should pass size to MenuItemContainer as the prop size", () => {
  //     expect(wrapper.find("MenuItemContainer").prop("size")).toBe(size);
  //   });

  //   it("should pass imageUrl to BackgroundImageContainer as the prop imageUrl", () => {
  //     expect(wrapper.find("BackgroundImageContainer").prop("imageUrl")).toBe(
  //       imageUrl
  //     );
  //   });
});
