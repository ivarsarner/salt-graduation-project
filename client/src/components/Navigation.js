import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const { data, actions } = useContext(CheckoutContext);
  const [currentStore, setCurrentStore] = useState(null);

  useEffect(() => {
    const getCurrentStore = data
      .slice(0, 1)
      .map((item) => item.merchantName)
      .join('');
    setCurrentStore(getCurrentStore);
  }, [data]);

  return (
    <div className="main-nav">
      <NavLink className="main-nav-logo" exact to="/">
        <img src={logo} alt="Way" width={100} />
      </NavLink>
      <p>{currentStore}</p>
      <div className="main-nav-links">
        <NavLink to="/other">Other</NavLink>
        <button
          className="new-checkout-button"
          onClick={() => actions.addNewCheckout()}
        >
          Add new Checkout
        </button>
      </div>
    </div>
  );
}
