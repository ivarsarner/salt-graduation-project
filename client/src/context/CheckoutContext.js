import React, { createContext, useState, useEffect } from 'react';
import mockData from '../assets/order-mock-data.json';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [data, setBooks] = useState(mockData);

  return (
    <CheckoutContext.Provider value={{ data }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
