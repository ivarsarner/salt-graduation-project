import React, { forwardRef } from 'react';
import CheckoutCard from './CheckoutCard';

const CheckoutHistoryCard = forwardRef(({ checkout }, ref) => (
  <div ref={ref}>
    <div className="checkout-card">
      <CheckoutCard checkout={checkout} hideHr hideItems />
    </div>
  </div>
));

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(CheckoutHistoryCard, propsAreEqual);
