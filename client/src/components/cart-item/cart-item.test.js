import React from "react";

import { CartItem } from "./cart-item.component";

describe("CartItem component", () => {
  const mockItem = {
    imageUrl: "www.test.com",
    price: 10,
    name: "hsts",
    quantity: 2,
  };

  it("should CartItem renders without error", () => {
    expect(<CartItem {...mockItem} />).toMatchSnapshot();
  });
});
