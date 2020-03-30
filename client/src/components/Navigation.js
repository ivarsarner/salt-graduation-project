import React, { useContext } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const { currentStore, checkoutsActions } = useContext(CheckoutContext);

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
          onClick={() => checkoutsActions.addNewCheckout()}
        >
          Add new Checkout
        </button>
      </div>
    </div>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(Navigation, shouldRender);
