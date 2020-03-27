import React from 'react';
import Moment from 'react-moment';

import Header from './Header';
import Item from './Item';

export default function Checkout({ data, checkoutID }) {
  return (
    <div>
      <h4>Checkout {checkoutID}</h4>
      <p>
        Time:
        <Moment fromNow>{data.timeCreated}</Moment>
      </p>
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
