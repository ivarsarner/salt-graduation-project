import React, { useContext } from 'react';
import CheckoutContext from '../context/CheckoutContext';

export default function CheckoutContainer() {
  const CheckoutData = useContext(CheckoutContext);

  console.log(CheckoutData);

  return <div>CheckoutContainer</div>;
}
