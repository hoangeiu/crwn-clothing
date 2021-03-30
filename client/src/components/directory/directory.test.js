import React from "react";
import { shallow } from "enzyme";

import { Directory } from "./directory.component";
import MenuItem from "../menu-item/menu-item.component";

describe("render Directory component", () => {
  let wrapper;
  let mockSections;
  beforeEach(() => {
    mockSections = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    const mockProps = {
      sections: mockSections,
    };

    wrapper = shallow(<Directory {...mockProps} />);
  });

  it("should Directory component render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render an equal number of MenuItem component as sections prop", () => {
    expect(wrapper.find(MenuItem).length).toEqual(mockSections.length);
  });
});
