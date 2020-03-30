import React, { useContext } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';

export default function Navigation() {
  const { currentStore } = useContext(CheckoutContext);

  return (
    <>
      <img src={logo} alt="Way" width="100px" />
      <p>Current Store: {currentStore}</p>
    </>
  );
}
