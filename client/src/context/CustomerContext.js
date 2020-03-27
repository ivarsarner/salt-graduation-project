import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data } = await axios.get('/api/customers');
    setCustomers(data);
  };

  const getRandomCustomer = () => customers[Math.floor(Math.random() * 9)];

  return (
    <CustomerContext.Provider
      value={{ customers, actions: { getRandomCustomer } }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
