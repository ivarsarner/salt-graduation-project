import React, { createContext, useState, useEffect } from 'react';
import mockData from '../assets/order-mock-data.json';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const filterData = mockData.filter(
      (checkout) => checkout.merchant === 'IfO0fugaM9XRaaICJ7LQ'
    );
    setCheckouts(filterData);
  }, []);

  return (
    <CheckoutContext.Provider value={{ checkouts }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
