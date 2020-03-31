import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';

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

  return (
    <div className="container">
      <div className="controls">
        <button
          className="new-checkout-button"
          onClick={() => setMobileView(false)}
        >
          Checkouts
        </button>
        <button
          className="new-checkout-button"
          onClick={() => setMobileView(true)}
        >
          History
        </button>
      </div>
      <section className={`recent ${showHistory ? 'hide' : ''}`}>
        {recentCheckouts.map((checkout) => (
          <CheckoutCard key={checkout.id.toString()} checkout={checkout} />
        ))}
      </section>
      <section className={`history ${showHistory ? '' : 'hide'}`}>
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
