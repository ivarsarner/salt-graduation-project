import React from 'react';
import Header from './Header';
import Item from './Item';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Checkout({ checkout, checkoutID }) {
  return (
    <div className="checkout-section">
      <h4>Checkout {checkoutID}</h4>
      <TransitionGroup>
        <CSSTransition
          key={checkout.id}
          timeout={450}
          classNames="slide"
          appear
        >
          <div className="checkout-card">
            <Header checkout={checkout} />
            <div className="item-container">
              {checkout.items.map((item) => (
                <Item key={item.gtin} itemData={item} />
              ))}
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(Checkout, shouldRender);
