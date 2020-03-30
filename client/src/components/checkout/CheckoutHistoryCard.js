import React from 'react';
import Header from './Header';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function CheckoutHistoryCard({ checkout }) {
  return (
    <TransitionGroup>
      <CSSTransition key={checkout.id} timeout={450} classNames="slide" appear>
        <div className="checkout-card">
          <Header checkout={checkout} hideHr={true} />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(CheckoutHistoryCard, shouldRender);
