import React from 'react';
import CheckoutCard from './CheckoutCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function CheckoutHistoryCard({ checkout }) {
  return (
    <TransitionGroup>
      <CSSTransition key={checkout.id} timeout={450} classNames="slide" appear>
        <CheckoutCard checkout={checkout} hideHr hideItems />
      </CSSTransition>
    </TransitionGroup>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(CheckoutHistoryCard, shouldRender);
