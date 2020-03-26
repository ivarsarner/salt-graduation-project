import React from 'react';
import Header from './Header';
import Item from './Item';

export default function Checkout({ data, checkoutID }) {
  return (
    <div>
      <h4>Checkout {checkoutID}</h4>
      <p>Time: {data.timeCreated}</p>
      <p>Store: {data.merchantName}</p>
      <p>Items</p>
      <div className="item-container">
        {data.items.map((item) => (
          <Item key={item.gtin} itemData={item} />
        ))}
      </div>
    </div>
  );
}
