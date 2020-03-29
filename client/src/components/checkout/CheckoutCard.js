import React from 'react';
import Header from './Header';
import Item from './Item';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Checkout({ products, checkoutID }) {
  return (
    <div className="checkout-section">
      <h4>Checkout {checkoutID}</h4>
      <TransitionGroup>
        <CSSTransition
          key={products.id}
          timeout={450}
          classNames="slide"
          appear
        >
          <div className="checkout-card">
            <Header headerData={products} />
            <div className="item-container">
              {products.items.map((item) => (
                <Item key={item.gtin} itemData={item} />
              ))}
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
