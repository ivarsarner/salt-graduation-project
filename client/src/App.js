import React from 'react';
import CheckoutContextProvider from './context/CheckoutContext';
import CustomerContextProvider from './context/CustomerContext';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import './App.scss';

export default function App() {
  return (
    <CheckoutContextProvider>
      <CustomerContextProvider>
        <Navigation />
        <CheckoutContainer />
      </CustomerContextProvider>
    </CheckoutContextProvider>
  );
}
