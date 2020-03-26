import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout';

export default function CheckoutContainer() {
  const { data } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);

  useEffect(() => {
    const recent = data
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 4);
    setRecentCheckouts(recent);
  }, [data]);

  return (
    <div>
      <ul>
        {/* how can we dymanically show the number of live checkouts */}
        {recentCheckouts.map((checkout, index) => (
          <CheckoutCard
            key={checkout.id.toString()}
            data={checkout}
            checkoutID={index + 1} // this is a temp fix. checkout id should come from the data
          />
        ))}
      </ul>
    </div>
  );
}
