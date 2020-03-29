import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';

export default function CheckoutContainer() {
  const { checkouts } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);

  useEffect(() => {
    const recent = checkouts.sort(
      (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
    );
    let displayCheckouts = [];
    if (recent.length) {
      displayCheckouts.push(recent.find((checkout) => checkout.checkout === 1));
      displayCheckouts.push(recent.find((checkout) => checkout.checkout === 2));
      displayCheckouts.push(recent.find((checkout) => checkout.checkout === 3));
      displayCheckouts.push(recent.find((checkout) => checkout.checkout === 4));
    }

    setRecentCheckouts(displayCheckouts);
  }, [checkouts]);

  return (
    <div className="container">
      {/* how can we dymanically show the number of live checkouts */}
      {recentCheckouts.map((checkout, index) => (
        <CheckoutCard
          key={checkout.id.toString()}
          products={checkout}
          checkoutID={checkout.checkout} // this is a temp fix. checkout id should come from the data
        />
      ))}
    </div>
  );
}
