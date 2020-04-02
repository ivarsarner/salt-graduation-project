import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import styled, { css } from 'styled-components';

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  font-size: 0.7rem;
  * {
    margin: 0;
  }
  ${(props) =>
    props.fullScreen &&
    css`
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 1rem;
    `};
`;

const Img = styled.img`
  height: 40px;
  border-radius: 10px;
  margin-right: 10px;
  ${(props) =>
    props.fullScreen &&
    css`
      margin-right: 0;
      height: 120px;
      margin-bottom: 1rem;
    `};
`;

const Headline = styled.h4`
  margin: 0;
`;

const CheckoutNumber = styled.p`
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 2rem;
  margin: 0;
`;

const Line = styled.hr`
  border: 0.5px solid #e1e1e1;
  width: 90%;
  margin: 0 2;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
`;

export default function Header({ checkout, hideHr, fullScreen }) {
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
      <HeaderDiv fullScreen={fullScreen}>
        <Image imageData={checkout} fullScreen={fullScreen} />
        <div className="details">
          <CustomerName customerData={checkout} />
          <div className="data">
            <Text>
              {checkoutTotal} items &bull; {itemPrice} kr
            </Text>
            <Moment fromNow>{checkout.timeCreated}</Moment>
          </div>
        </div>
      </HeaderDiv>
      {hideHr ? '' : <Line />}
    </>
  );
}

export function Image({ imageData, fullScreen }) {
  // this should be replaced by a real checkout id from Firebase
  const randomId = Math.floor(Math.random() * 4 + 1);

  if (imageData !== undefined) {
    return (
      <Img
        src={imageData.customer.imageUrl}
        alt={imageData.customer.name}
        fullScreen={fullScreen}
      />
    );
  } else {
    return <CheckoutNumber>{randomId}</CheckoutNumber>;
  }
}

export function CustomerName({ customerData }) {
  if (customerData !== undefined) {
    return (
      <Headline>{customerData.customer && customerData.customer.name}</Headline>
    );
  } else {
    return null;
  }
}
