import React from "react";

import "./checkout-item.styles.scss";

const CheckoutItem = ({
  cartItem: { id, name, imageUrl, price, quantity },
}) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} atl="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price}</span>
      <span className="remove-button">&#10005;</span>
    </div>
  );
};

export default CheckoutItem;
