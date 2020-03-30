import React, { useEffect, useState, useContext } from 'react';
// import { CustomerContext } from '../../context/CustomerContext';
import Moment from 'react-moment';

export default function Header({ checkout }) {
  // const { customers, customersActions } = useContext(CustomerContext);
  // const [customer, setCustomer] = useState('');
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    const checkoutTotal = checkout.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(checkoutTotal);
    // setCustomer(customersActions.getRandomCustomer());
  }, [checkout.items]);

  return (
    <div>
      <header className="checkout-card__header">
        <section className="checkout-card__header__left">
          <img
            src={checkout.customer && checkout.customer.imageUrl}
            alt="Customer"
          />
        </section>
        <section className="checkout-card__header__middle">
          <h4>{checkout.customer && checkout.customer.name}</h4>
          <p>
            {checkoutTotal} items &bull; {' ' + checkout.price} kr &bull;{' '}
          </p>
          <Moment fromNow>{checkout.timeCreated}</Moment>
        </section>
      </header>
      <hr></hr>
    </div>
  );
}
