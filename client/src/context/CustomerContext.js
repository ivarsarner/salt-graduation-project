import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    console.log('hi');
  }, []);

  const fetchCustomers = async () => {
    const { data } = await axios.get('/api/customers');
    setCustomers(data);
  };

  return (
    <CustomerContext.Provider value={{ customers }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
