import React, { createContext, useState, useEffect } from 'react';
import mockData from '../assets/order-mock-data.json';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [checkouts, setCheckouts] = useState([]);
  const [checkoutSyncComplete, setCheckoutSyncComplete] = useState(false);
  const [currentStore, setCurrentStore] = useState('');

  const filterOrders = () => {
    const filterData = mockData.filter(
      (checkout) => checkout.merchant === 'IfO0fugaM9XRaaICJ7LQ'
    );
    setCheckouts(filterData);
    setCheckoutSyncComplete(true);
  };

  const filterCurrentStore = () =>
    setCurrentStore(checkouts[0] && checkouts[0].merchantName);

  useEffect(() => filterOrders(), []);
  useEffect(() => filterCurrentStore(), [checkoutSyncComplete]);

  return (
    <CheckoutContext.Provider value={{ checkouts, currentStore }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
