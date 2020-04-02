import React, { useState } from 'react';
import Header from '../components/checkout/Header';
import { CSSTransition } from 'react-transition-group';

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
        <div className="card">
          <Header checkout={data} />
          <p>hey there </p>
        </div>
      </CSSTransition>
    </div>
  );
}
