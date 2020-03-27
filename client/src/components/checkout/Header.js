import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import isabelleIMG from '../../assets/isabelle.JPG';
import doneIMG from '../../assets/done.JPG';

export default function Header({ itemData }) {
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    const reducer = itemData.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(reducer);
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
          <Moment fromNow>{itemData.timeCreated}</Moment>
        </span>
      </section>
      <section className="checkout-card__header__right">
        <img src={doneIMG} />
      </section>
    </header>
  );
}
