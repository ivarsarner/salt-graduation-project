import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import Header from './Header';
import Item from './Item';

const CheckoutCard = forwardRef(({ checkout, showFullList }, ref) => {
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
    <div ref={ref}>
      <div
        className="checkout-card"
        onClick={() => checkoutsActions.showMoreDetails(checkout.id)}
      >
        <Header checkout={checkout} />
        <div className="items-container">
          {itemsToRender.map((item) => (
            <Item key={item.gtin} itemData={item} />
          ))}
        </div>
      </div>
    </div>
  );
});

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(CheckoutCard, shouldRender);
