import React from 'react';
import Header from '../components/checkout/Header';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function OrderDetails({ data, close }) {
  return (
    <TransitionGroup>
      <CSSTransition key={data.id} timeout={450} classNames="slide" appear>
        <div className="order-details">
          <div className="background" onClick={() => close()}>
            <div className="card">
              <Header checkout={data} />
              <p>hey there {data.customer.name}</p>
            </div>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
