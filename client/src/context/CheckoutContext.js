import React, { createContext, useState, useEffect } from 'react';
import mockData from '../assets/order-mock-data.json';
import newMockData from '../assets/new-checkouts-mock-data.json';
import moment from 'moment';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [checkouts, setData] = useState([]);
  const [newCheckoutData, setNewCheckoutData] = useState([]);

  useEffect(() => {
    const filterData = mockData
      .filter((checkout) => checkout.merchant === 'IfO0fugaM9XRaaICJ7LQ')
      .map((checkout) => ({
        ...checkout,
        checkout: Math.floor(Math.random() * 4) + 1,
      }));
    setNewCheckoutData(newMockData);
    setData(filterData);
  }, []);

  const addNewCheckout = () => {
    let newCheckout = newCheckoutData.splice(-1, 1);
    newCheckout = {
      ...newCheckout[0],
      timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      checkout: Math.floor(Math.random() * 4) + 1,
    };
    setData((prevState) => {
      return [...prevState, newCheckout];
    });
  };

  return (
    <CheckoutContext.Provider
      value={{ checkouts, checkoutsActions: { addNewCheckout } }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
