import React, { createContext, useState } from 'react';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [books, setBooks] = useState([
    { title: 'A Brave New World', id: 1 },
    { title: 'War of the worlds', id: 2 },
    { title: 'Rendezvous with Rama', id: 3 },
    { title: "Childhood's End", id: 4 },
  ]);
  return (
    <CheckoutContext.Provider value={{ books }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
