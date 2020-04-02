import React, { useContext, useState, useEffect } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';
import OrderDetailsCard from './OrderDetails';
import Contols from './Controls';
import Loading from './Loading';
import FlipMove from 'react-flip-move';

export default function CheckoutContainer() {
  const { checkouts, orderDetails } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);
  const [historyCheckouts, setHistoryCheckouts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const recent = checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 3);
    setRecentCheckouts(recent);
  }, [checkouts]);

  useEffect(() => {
    const history = checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(3, 14);
    setHistoryCheckouts(history);
  }, [checkouts]);

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
          show={orderDetails.showOrderDetails}
        />
      )}

      <Contols setMobileView={setMobileView} />
      <section className={`recent ${showHistory ? 'hide' : ''}`}>
        <h4>Checkout feed</h4>
        <FlipMove
          typeName={null}
          leaveAnimation="fade"
          enterAnimation={{
            from: {
              opacity: 0.1,
              transform: 'scale(0.5)',
            },
            to: {
              opacity: 1,
              transform: 'scale(1)',
            },
          }}
        >
          {recentCheckouts.map((checkout) => (
            <CheckoutCard key={checkout.id.toString()} checkout={checkout} />
          ))}
        </FlipMove>
      </section>
      <section className={`history ${showHistory ? '' : 'hide'}`}>
        <h4>Log</h4>
        <FlipMove typeName={null} enterAnimation="accordionVertical">
          {historyCheckouts.map((checkout) => (
            <CheckoutHistoryCard
              key={checkout.id.toString()}
              checkout={checkout}
            />
          ))}
        </FlipMove>
      </section>
    </div>
  );
}
