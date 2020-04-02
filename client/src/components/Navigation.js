import React, { useContext } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MainNav = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  margin-top: 1rem;
  > * {
    margin: 0rem 1rem;
  }
  .main-nav-logo {
    margin-right: 0;
  }
  @media (max-width: 625px) {
    padding: 0 10px;
    justify-content: space-between;
    *,
    img {
      margin: 0;
    }
  }
`;

const NavLinks = styled.div`
  margin-left: auto;
`;

function Navigation() {
  const { currentStore, checkoutsActions } = useContext(CheckoutContext);

  return (
    <MainNav>
      <NavLink className="main-nav-logo" exact to="/">
        <img src={logo} alt="Way" width={100} />
      </NavLink>
      <p className="store-name">{currentStore}</p>
      <NavLinks>
        {/* <NavLink to="/other">Other</NavLink> */}
        <Button text="Add New" clickAction={checkoutsActions.addNewCheckout} />
      </NavLinks>
    </MainNav>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(Navigation, shouldRender);
