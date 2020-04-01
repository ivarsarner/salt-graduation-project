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
        <Image imageData={checkout} />
        <div className="details">
          <CustomerName customerData={checkout} />
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

export function Image({ imageData }) {
  // this should be replaced by a real checkout id from Firebase
  const randomId = Math.floor(Math.random() * 4 + 1);

  if (imageData === true && imageData !== undefined) {
    return (
      <img src={imageData.customer.imageUrl} alt={imageData.customer.name} />
    );
  } else {
    return <p className="checkout-number">{randomId}</p>;
  }
}

export function CustomerName({ customerData }) {
  if (customerData === true && customerData !== undefined) {
    return <h4>{customerData.customer && customerData.customer.name}</h4>;
  } else {
    return null;
  }
}
