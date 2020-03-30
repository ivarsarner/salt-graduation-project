import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';

export default function CheckoutContainer() {
  const { checkouts } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);

  useEffect(() => {
    const recent = checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 4);
    setRecentCheckouts(recent);
  }, [checkouts]);

  return (
    <div className="container">
      <section className="recent">
        {recentCheckouts.map((checkout) => (
          <CheckoutCard
            key={checkout.id.toString()}
            checkout={checkout}
            checkoutID={checkout.checkoutId} // this is a temp fix. checkout id should come from the data
          />
        ))}
      </section>
      <section className="history">i'm on the other left </section>
    </div>
  );
}
