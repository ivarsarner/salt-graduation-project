import React, { forwardRef } from 'react';
import Header from './Header';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CheckoutHistoryCard = forwardRef(({ checkout }, ref) => (
  <div ref={ref}>
    <div className="checkout-card">
      <Header checkout={checkout} hideHr={true} />
    </div>
  </div>
));

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(CheckoutHistoryCard, shouldRender);
