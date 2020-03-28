import React from 'react';
import Header from './Header';
import Item from './Item';

export default function Checkout({ products, checkoutID }) {
  return (
    <div className="checkout-card">
      <h4 className="checkout-card__checkoutNr">Checkout {checkoutID}</h4>
      <Header headerData={products} />
      <div className="item-container">
        {products.items.map((item) => (
          <Item key={item.gtin} itemData={item} />
        ))}
      </div>
    </div>
  );
}
