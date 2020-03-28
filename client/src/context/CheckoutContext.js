import React, { createContext, useState, useEffect } from 'react';
import mockData from '../assets/order-mock-data.json';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [checkoutSyncComplete, setCheckoutSyncComplete] = useState(false);
  const [currentStore, setCurrentStore] = useState('');

  const filterOrders = () => {
    const filterData = mockData.filter(
      (checkout) => checkout.merchant === 'IfO0fugaM9XRaaICJ7LQ'
    );
    setData(filterData);
    setCheckoutSyncComplete(true);
  };

  const filterCurrentStore = () =>
    setCurrentStore(data[0] && data[0].merchantName);

  useEffect(() => filterOrders(), []);
  useEffect(() => filterCurrentStore(), [checkoutSyncComplete]);

  return (
    <CheckoutContext.Provider value={{ data, currentStore }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
