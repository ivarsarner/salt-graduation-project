import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import styled, { css } from 'styled-components';
import CustomerName from './CustomerName';
import Image from './Image';

const S = {};
S.HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  font-size: 0.7rem;
  ${(props) =>
    props.fullScreen &&
    css`
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 1rem;
    `};
`;

S.Line = styled.hr`
  border: 0.5px solid #e1e1e1;
  width: 90%;
  margin: 0 2;
`;

S.Text = styled.p`
  margin: 0;
  padding: 0;
`;

function Header({ checkout, hideHr, fullScreen }) {
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
      <S.HeaderDiv fullScreen={fullScreen}>
        <Image imageData={checkout.customer} fullScreen={fullScreen} />
        <div className="details">
          <CustomerName customerData={checkout} />
          <div className="data">
            <S.Text>
              {checkoutTotal} items &bull; {itemPrice} kr
            </S.Text>
            <Moment fromNow>{checkout.timeCreated}</Moment>
          </div>
        </div>
      </S.HeaderDiv>
      {hideHr ? '' : <S.Line />}
    </>
  );
}

export default React.memo(Header);
