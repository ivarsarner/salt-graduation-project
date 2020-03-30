import React from 'react';
import Header from './Header';
import Item from './Item';

export default function Checkout({ checkout, checkoutID }) {
  return (
    <div className="checkout-card">
      <h4 className="checkout-card__checkout-number">Checkout {checkoutID}</h4>
      <Header checkout={checkout} />
      <div className="item-container">
        {checkout.items.map((item) => (
          <Item key={item.gtin} itemData={item} />
        ))}
      </div>
    </div>
  );
}
