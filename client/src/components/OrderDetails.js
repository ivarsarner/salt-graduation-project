import React, { useState } from 'react';
import CheckoutCard from '../components/checkout/CheckoutCard';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Card = styled.div`
  position: absolute;
  background: #fff;
  width: 600px;
  height: 80vh;
  bottom: 0;
  padding: 20px;
`;

export default function OrderDetails({ data, close, show }) {
  const [showBackground, setShowBackground] = useState(false);

  return (
    <div
      className={`order-details overlay-hidden ${
        showBackground ? 'overlay-display' : ''
      }`}
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
          <CheckoutCard checkout={data} showFullList />
        </Card>
      </CSSTransition>
    </div>
  );
}
