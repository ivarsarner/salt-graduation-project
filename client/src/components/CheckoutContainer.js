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
      {/* how can we dymanically show the number of live checkouts */}
      {recentCheckouts.map((checkout, index) => (
        <CheckoutCard
          key={checkout.id.toString()}
          checkout={checkout}
          checkoutID={index + 1} // this is a temp fix. checkout id should come from the data
        />
      ))}
    </div>
  );
}
