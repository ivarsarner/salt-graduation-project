import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

export default function Header({ checkout, hideHr }) {
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [itemPrice, setItemprice] = useState(0);

  useEffect(() => {
    const checkoutTotal = checkout.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(checkoutTotal);
    setItemprice((Math.round(checkout.price * 100) / 100).toFixed(2));
  }, [checkout.items, checkout.price]);

  return (
    <>
      <header className="header">
        <img
          src={checkout.customer && checkout.customer.imageUrl}
          alt="customer"
        />
        <div className="details">
          <h4>{checkout.customer && checkout.customer.name}</h4>
          <div className="data">
            <p>
              {checkoutTotal} items &bull; {itemPrice} kr
            </p>
            <Moment fromNow>{checkout.timeCreated}</Moment>
          </div>
        </div>
      </header>
      {hideHr ? '' : <hr></hr>}
    </>
  );
}
