import React from 'react';
import Header from './Header';
import ItemsContainer from './ItemContainer';
import Item from './Item';

export default function Checkout({ data, checkoutID }) {
  return (
    <div>
      <h4>Checkout {checkoutID}</h4>
      <p>Time: {data.timeCreated}</p>
      <p>Store: {data.merchantName}</p>
      <p>Items</p>
      <ul>
        {data.items.map((item) => (
          <div className="item-container">
            <Item itemData={item} />
          </div>
        ))}
      </ul>
    </div>
  );
}
