import React, { useEffect, useState, useContext } from 'react';
// import { CustomerContext } from '../../context/CustomerContext';
import Moment from 'react-moment';

export default function Header({ checkout, hideHr }) {
  // const { customers, customersActions } = useContext(CustomerContext);
  // const [customer, setCustomer] = useState('');
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    const checkoutTotal = checkout.items.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    setCheckoutTotal(checkoutTotal);
    // setCustomer(customersActions.getRandomCustomer());
  }, [checkout.items]);

  return (
    <>
      <header className="header">
        <img src={checkout.customer && checkout.customer.imageUrl} />
        <div className="details">
          <h4>{checkout.customer && checkout.customer.name}</h4>
          <div className="data">
            <p>
              {checkoutTotal} items &bull; {checkout.price} kr
            </p>
            <Moment fromNow>{checkout.timeCreated}</Moment>
          </div>
        </div>
      </header>
      {hideHr ? '' : <hr></hr>}
    </>
  );
}
