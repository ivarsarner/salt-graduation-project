import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';
import OrderDetailsCard from './OrderDetails';
import Contols from './Controls';
import Loading from './Loading';

export default function CheckoutContainer() {
  const { orderDetails, state } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);
  const [historyCheckouts, setHistoryCheckouts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const recent = state.checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 3);
    setRecentCheckouts(recent);
  }, [state.checkouts]);

  useEffect(() => {
    const history = state.checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(3, 14);
    setHistoryCheckouts(history);
  }, [state.checkouts]);

  const setMobileView = (state) => {
    setShowHistory(state);
  };

  if (recentCheckouts.length < 1) {
    return <Loading />;
  }

  return (
    <div className="container">
      {orderDetails.showOrderDetails && (
        <OrderDetailsCard
          close={orderDetails.hideOrderDetails}
          data={orderDetails.orderDetails}
        />
      )}
      <Contols setMobileView={setMobileView} />
      <section className={`recent ${showHistory ? 'hide' : ''}`}>
        <h4>Checkout feed</h4>
        {recentCheckouts.map((checkout) => (
          <CheckoutCard key={checkout.id.toString()} checkout={checkout} />
        ))}
      </section>
      <section className={`history ${showHistory ? '' : 'hide'}`}>
        <h4>Log</h4>
        {historyCheckouts.map((checkout) => (
          <CheckoutHistoryCard
            key={checkout.id.toString()}
            checkout={checkout}
          />
        ))}
      </section>
    </div>
  );
}
