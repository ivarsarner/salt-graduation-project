import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';

export default function Navigation() {
  const { data } = useContext(CheckoutContext);
  const [currentStore, setCurrentStore] = useState('');

  useEffect(() => {
    // const getCurrentStore = data[0];
    // console.log(getCurrentStore.merchantName || 'jeff');
  });

  return (
    <>
      <img src={logo} alt="Way" width="100px" />
      <p>Current Store: ICA Supermarket Sabbatsberg</p>
    </>
  );
}
