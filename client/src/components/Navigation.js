import React, { useContext } from 'react';
import logo from '../assets/logo-black.svg';
import { CheckoutContext } from '../context/CheckoutContext';
import Button from '../components/helpers/Button';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { LoginContext } from '../context/LoginContext';

const Logo = styled.img`
  margin-right: 0;
`;

const MainNav = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  margin-top: 1rem;
  > * {
    margin: 0rem 1rem;
  }
  @media (max-width: 625px) {
    padding: 0 10px;
    justify-content: space-between;
    > * {
      margin: 0;
    }
  }
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  @media (max-width: 625px) {
    button {
      &:first-child {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0px;
        width: 75px;
        &:after {
          font-size: 12px;
          content: '+ Add';
        }
      }
    }
  }
`;

const StoreName = styled.p`
  text-align: center;
`;

function Navigation() {
  const { checkoutsActions, state } = useContext(CheckoutContext);
  const { loggedinUserActions } = useContext(LoginContext);

  return (
    <MainNav>
      <NavLink className="main-nav-logo" exact to="/">
        <Logo src={logo} alt="Way" width={100} />
      </NavLink>
      <StoreName>{state.currentStore}</StoreName>
      <NavLinks>
        <Button onClick={checkoutsActions.addNewCheckout}>Add New</Button>
        <Button onClick={loggedinUserActions.logOut}>Log out</Button>
      </NavLinks>
    </MainNav>
  );
}

export default Navigation;
