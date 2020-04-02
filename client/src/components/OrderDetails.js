import React, { useState } from 'react';
import CheckoutCard from '../components/checkout/CheckoutCard';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import closeIcon from '../assets/close.svg';

const Card = styled.div`
  position: absolute;
  background: #fff;
  width: 700px;
  height: 80vh;
  bottom: 0;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  @media (max-width: 625px) {
    width: 100%;
  }
`;

const OrderDetailsDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.3s linear;
  visibility: hidden;
  ${(props) =>
    props.showBackground &&
    css`
      background-color: rgba(0, 0, 0, 0.6);
      visibility: visible;
    `};
`;

const CloseDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const CloseBtn = styled.img`
  width: 25px;
`;

export default function OrderDetails({ data, close, show }) {
  const [showBackground, setShowBackground] = useState(false);

  return (
    <OrderDetailsDiv
      showBackground={showBackground}
      onClick={() => {
        close();
        setShowBackground(false);
      }}
    >
      <CSSTransition
        in={show}
        timeout={300}
        classNames="order-details"
        unmountOnExit
        onEntered={() => setShowBackground(true)}
        appear
      >
        <Card>
          <CloseDiv>
            <CloseBtn src={closeIcon} alt="" />
          </CloseDiv>
          <CheckoutCard checkout={data} showFullList />
        </Card>
      </CSSTransition>
    </OrderDetailsDiv>
  );
}
