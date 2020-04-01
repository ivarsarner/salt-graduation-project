import React, { useContext } from 'react';
import Header from './Header';
import Item from './Item';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CheckoutContext } from '../../context/CheckoutContext';

function CheckoutCard({ checkout }) {
  const { checkoutsActions } = useContext(CheckoutContext);

  return (
    <TransitionGroup>
      <CSSTransition key={checkout.id} timeout={450} classNames="slide" appear>
        <div
          className="checkout-card"
          onClick={() => checkoutsActions.showMoreDetails(checkout.id)}
        >
          <Header checkout={checkout} />
          <div className="items-container">
            {checkout.items.map((item) => (
              <Item key={item.gtin} itemData={item} />
            ))}
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(CheckoutCard, shouldRender);
