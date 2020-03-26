import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';

export default function CheckoutContainer() {
  const { data } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);

  useEffect(() => {
    const recent = data
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 4);
    setRecentCheckouts(recent);
  });

  return (
    <div>
      <ul>
        {recentCheckouts.map((checkout) => (
          <li key={checkout.id}>{checkout.timeCreated}</li>
        ))}
      </ul>
    </div>
  );
}
