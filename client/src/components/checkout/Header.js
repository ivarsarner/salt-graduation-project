import React, { useEffect, useState, useContext } from 'react';
import { CustomerContext } from '../../context/CustomerContext';
import Moment from 'react-moment';
import doneIMG from '../../assets/done.JPG';

export default function Header({ checkout }) {
  const { customers, customersActions } = useContext(CustomerContext);
  const [customer, setCustomer] = useState('');
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    const checkoutTotal = checkout.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(checkoutTotal);
    setCustomer(customersActions.getRandomCustomer());
  }, [customers, checkout.items, customersActions]);

  return (
    <div>
      <header className="checkout-card__header">
        <section className="checkout-card__header__left">
          <img src={customer && customer.picture} alt="Customer" />
        </section>
        <section className="checkout-card__header__middle">
          <div className="checkout-card__header__name">
            {customer && customer.name}
          </div>
          <span className="checkout-card__header__middle__quantity">
            {checkoutTotal} items &bull;
          </span>
          <span className="checkout-card__header__middle__total">
            {' ' + checkout.price} kr &bull;
          </span>
          <span className="checkout-card__header__middle__time">
            {' '}
            <Moment fromNow>{checkout.timeCreated}</Moment>
          </span>
        </section>
        {/* <section className="checkout-card__header__right">
          <img src={doneIMG} alt="Status of transaction" />
        </section> */}
      </header>
      <hr></hr>
    </div>
  );
}
