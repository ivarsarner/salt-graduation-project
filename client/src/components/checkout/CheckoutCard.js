import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CheckoutContext } from '../../context/CheckoutContext';
import Header from './Header';
import Item from './Item';

function CheckoutCard({ checkout, showFullList }) {
  const { checkoutsActions } = useContext(CheckoutContext);
  const [itemsToRender, setItemsToRender] = useState([]);

  useEffect(() => {
    if (!showFullList) {
      const limitItems = checkout.items.slice(-4);
      setItemsToRender(limitItems);
    } else {
      setItemsToRender(checkout.items);
    }
  }, [checkout.items, showFullList]);

  return (
    <TransitionGroup>
      <CSSTransition key={checkout.id} timeout={450} classNames="slide" appear>
        <div
          className={`checkout-card ${showFullList ? 'full-screen' : ''}`}
          onClick={() => checkoutsActions.showMoreDetails(checkout.id)}
        >
          <Header checkout={checkout} />
          <div className="items-container">
            {itemsToRender.map((item) => (
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
