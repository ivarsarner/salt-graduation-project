import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';
import Contols from './Controls';

export default function CheckoutContainer() {
  const { checkouts } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);
  const [historyCheckouts, setHistoryCheckouts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const recent = checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 4);
    setRecentCheckouts(recent);
  }, [checkouts]);

  useEffect(() => {
    const history = checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(4, 14);
    setHistoryCheckouts(history);
  }, [checkouts]);

  const setMobileView = (state) => {
    setShowHistory(state);
  };

  if (recentCheckouts.length < 1) {
    return (
      <div className="loading-container">
        <div className="loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Contols setMobileView={setMobileView} />
      <section className={`recent ${showHistory ? 'hide' : ''}`}>
        <h3>Checkout feed</h3>
        {recentCheckouts.map((checkout) => (
          <CheckoutCard key={checkout.id.toString()} checkout={checkout} />
        ))}
      </section>
      <section className={`history ${showHistory ? '' : 'hide'}`}>
        <h3>Log</h3>
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
