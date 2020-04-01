import React from 'react';
import CheckoutCard from '../components/checkout/CheckoutCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function OrderDetails({ data, close }) {
  return (
    <TransitionGroup>
      <CSSTransition key={data.id} timeout={450} classNames="slide" appear>
        <div className="order-details">
          <div className="background" onClick={() => close()}>
            <div className="card">
              <CheckoutCard checkout={data} showFullList />
            </div>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
