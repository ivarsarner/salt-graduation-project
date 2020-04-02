import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  * {
    font-size: 0.7rem;
    margin: 0;
    padding: 0 0 0 10px;
  }
`;

const Img = styled.img`
  height: 40px;
  border-radius: 10px;
`;

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
      <HeaderDiv>
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
      </HeaderDiv>
      {hideHr ? '' : <hr></hr>}
    </>
  );
}

export function Image({ imageData }) {
  // this should be replaced by a real checkout id from Firebase
  const randomId = Math.floor(Math.random() * 4 + 1);

  if (imageData !== undefined) {
    return (
      <Img src={imageData.customer.imageUrl} alt={imageData.customer.name} />
    );
  } else {
    return <p className="checkout-number">{randomId}</p>;
  }
}

export function CustomerName({ customerData }) {
  if (customerData !== undefined) {
    return <h4>{customerData.customer && customerData.customer.name}</h4>;
  } else {
    return null;
  }
}
