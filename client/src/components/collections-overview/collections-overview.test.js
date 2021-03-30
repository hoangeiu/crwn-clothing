import React from "react";
import { shallow } from "enzyme";

import { CollectionsOverview } from "./collections-overview.component";
import CollectionPreview from "../collection-preview/collection-preview.component";

describe("CollectionsOverview component", () => {
  let wrapper;
  let mockCollections;
  beforeEach(() => {
    mockCollections = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    const mockProps = {
      collections: mockCollections,
    };

    wrapper = shallow(<CollectionsOverview {...mockProps} />);
  });

  it("should CollectionsOverview render without error", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a equal number of CollectionPreview component as collections prop", () => {
    expect(wrapper.find(CollectionPreview).length).toEqual(
      mockCollections.length
    );
  });
});
