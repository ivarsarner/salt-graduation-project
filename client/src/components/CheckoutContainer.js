import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';
import OrderDetailsCard from './OrderDetails';
import Contols from './helpers/Controls';
import Loading from './helpers/Loading';
import Button from './helpers/Button';
import FlipMove from 'react-flip-move';

const Container = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 625px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Headline = styled.h4`
  margin: 5px;
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
  > h4 {
    margin-bottom: 15px;
  }
`;

const HistoryContainer = styled(Section)`
  display: flex;
  justify-content: column;
  flex: 0 0 40%;
  max-width: 430px;
  min-width: 250px;
`;

const History = styled(Section)`
  top: 0;
  height: calc(100vh - 120px);
  overflow: scroll;
  .header {
    margin-bottom: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function CheckoutContainer() {
  const { state, dispatch, checkoutsActions } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);
  const [historyCheckouts, setHistoryCheckouts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const sortRecentCheckouts = () => {
    const recent = state.checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 3);
    setRecentCheckouts(recent);
  };

  const sortHistoryCheckouts = () => {
    const history = state.checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(3, 14);
    setHistoryCheckouts(history);
  };

  useEffect(() => {
    sortRecentCheckouts();
    sortHistoryCheckouts();
  }, [state.checkouts]);

  const setMobileView = (state) => {
    setShowHistory(state);
  };

  if (recentCheckouts.length < 1) {
    return <Loading />;
  }

  return (
    <>
      {!showHistory && (
        <Button onClick={checkoutsActions.addNewCheckout} addNew>
          + Add
        </Button>
      )}
      <Container>
        {state.showOrderDetails && (
          <OrderDetailsCard
            close={() => dispatch({ type: 'TOGGLE_ORDER_DETAILS' })}
            data={state.currentOrderDetails}
            show={state.showOrderDetails}
          />
        )}

        <Contols setMobileView={setMobileView} />

        <Recent hide={showHistory}>
          <Headline>Checkouts</Headline>
          <FlipMove
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
        </Recent>
        <HistoryContainer hide={!showHistory}>
          <Headline>History</Headline>
          <History>
            <FlipMove enterAnimation="accordionVertical">
              {historyCheckouts.map((checkout) => (
                <CheckoutHistoryCard
                  key={checkout.id.toString()}
                  checkout={checkout}
                />
              ))}
            </FlipMove>
          </History>
        </HistoryContainer>
      </Container>
    </>
  );
}
