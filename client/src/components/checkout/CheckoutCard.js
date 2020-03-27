import React from 'react';
import Header from './Header';
import Item from './Item';

export default function Checkout({ data, checkoutID }) {
  return (
    <div className="checkout-card">
      <h4>Checkout {checkoutID}</h4>
      <Header itemData={data} />
      <div className="item-container">
        {data.items.map((item) => (
          <Item key={item.gtin} itemData={item} />
        ))}
      </div>
    </div>
  );
}
