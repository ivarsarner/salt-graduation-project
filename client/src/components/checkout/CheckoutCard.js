import React, { useEffect, useState } from 'react';
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
      <Header itemData={data} />
      <div className="item-container">
        {data.items.map((item) => (
          <Item key={item.gtin} itemData={item} />
        ))}
      </div>
    </div>
  );
}
