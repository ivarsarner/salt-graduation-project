import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';
import OrderDetailsCard from './OrderDetails';
import Contols from './Controls';
import Loading from './Loading';

const Container = styled.div`
  display: flex;
  justify-content: center;
  h4 {
    margin: 5px;
  }
  @media (max-width: 625px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (max-width: 625px) {
    padding-top: 0;
    max-width: 600px;
    width: 100%;
    ${(props) =>
      props.hide &&
      css`
        display: none;
      `};
  }
`;

const Recent = styled(Section)`
  max-height: calc(100vh - 110px);
  flex: 0 0 55%;
  max-width: 550px;
  min-width: 300px;
`;

const History = styled(Section)`
  flex: 0 0 40%;
  max-width: 430px;
  min-width: 250px;
  .header {
    margin-bottom: 0;
  }
`;

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
    <Container>
      {orderDetails.showOrderDetails && (
        <OrderDetailsCard
          close={orderDetails.hideOrderDetails}
          data={orderDetails.orderDetails}
          show={orderDetails.showOrderDetails}
        />
      )}

      <Contols setMobileView={setMobileView} />
      <Recent hide={showHistory}>
        <h4>Checkout feed</h4>
        {recentCheckouts.map((checkout) => (
          <CheckoutCard key={checkout.id.toString()} checkout={checkout} />
        ))}
      </Recent>

      <History hide={!showHistory}>
        <h4>Log</h4>
        {historyCheckouts.map((checkout) => (
          <CheckoutHistoryCard
            key={checkout.id.toString()}
            checkout={checkout}
          />
        ))}
      </History>
    </Container>
  );
}
