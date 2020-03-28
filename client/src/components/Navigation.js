import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';

export default function Navigation() {
  const { checkouts } = useContext(CheckoutContext);
  const [currentStore, setCurrentStore] = useState(null);

  useEffect(() => {
    const getCurrentStore = checkouts
      .slice(0, 1)
      .map((item) => item.merchantName)
      .join('');
    setCurrentStore(getCurrentStore);
  }, [checkouts]);

  return (
    <>
      <img src={logo} alt="Way" width="100px" />
      <p>Current Store: {currentStore}</p>
    </>
  );
}
