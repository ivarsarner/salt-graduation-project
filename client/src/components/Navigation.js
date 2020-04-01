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
      <p className="store-name">{currentStore}</p>
      <div className="main-nav-links">
        {/* <NavLink to="/other">Other</NavLink> */}
        <button
          className="button button-dark "
          onClick={() => checkoutsActions.addNewCheckout()}
        >
          Add New
        </button>
      </div>
    </div>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(Navigation, shouldRender);
