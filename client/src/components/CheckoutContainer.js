import React, { useContext } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';

export default function CheckoutContainer() {
  const { data } = useContext(CheckoutContext);
  return (
    <div>
      <ul>
        {data.map((checkout) => (
          <li key={checkout.id}>{checkout.merchantName}</li>
        ))}
      </ul>
    </div>
  );
}
