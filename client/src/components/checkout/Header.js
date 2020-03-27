import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';
import { CustomerContext } from '../../context/CustomerContext';
import isabelleIMG from '../../assets/isabelle.JPG';
import doneIMG from '../../assets/done.JPG';

export default function Header({ headerData }) {
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const { customers, actions } = useContext(CustomerContext);
  const [customer, setCustomer] = useState('');

  useEffect(() => {
    const reducer = headerData.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(reducer);
    const fetchedCustomer = actions.getRandomCustomer();
    console.log(fetchedCustomer);
    // setCustomer(fetchedCustomer);
  });

  return (
    <header className="checkout-card__header">
      <section className="checkout-card__header__left">
        <img src={isabelleIMG} />
      </section>
      <section className="checkout-card__header__middle">
        <div className="checkout-card__header__name">Isabelle Böbsson</div>
        <span className="checkout-card__header__middle__quantity">
          {checkoutTotal} items &bull;
        </span>
        <span className="checkout-card__header__middle__total">
          {checkoutTotal} kr &bull;
        </span>
        <span className="checkout-card__header__middle__time">
          <Moment fromNow>{headerData.timeCreated}</Moment>
        </span>
      </section>
      <section className="checkout-card__header__right">
        <img src={doneIMG} />
      </section>
    </header>
  );
}
