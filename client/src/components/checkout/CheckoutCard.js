import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import Header from './Header';
import Item from './Item';

export default function Checkout({ data, checkoutID }) {
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    const reducer = data.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(reducer);
  });

  return (
    <div className="checkout-card">
      <h4>Checkout {checkoutID}</h4>
      <p>
        Time: <Moment fromNow>{data.timeCreated}</Moment>
      </p>
      <p>{checkoutTotal} items</p>
      <div className="item-container">
        {data.items.map((item) => (
          <Item key={item.gtin} itemData={item} />
        ))}
      </div>
    </div>
  );
}
