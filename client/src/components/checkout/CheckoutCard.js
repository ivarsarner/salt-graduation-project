import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CheckoutContext } from '../../context/CheckoutContext';
import Header from './Header';
import Item from './Item';

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CheckoutCardDiv = styled.div`
  border-radius: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  font-size: 1rem;
  z-index: -1;
  transition: all 0.13s ease-in;
  ${(props) =>
    props.fullScreen &&
    css`
      box-shadow: none;
      img {
        width: 60px;
        height: auto;
      }
      &:hover {
        transform: none;
        cursor: initial;
      }
    `};
`;

function CheckoutCard({ checkout, showFullList }) {
  const { checkoutsActions } = useContext(CheckoutContext);
  const [itemsToRender, setItemsToRender] = useState([]);

  useEffect(() => {
    if (!showFullList) {
      const limitItems = checkout.items.slice(-4);
      setItemsToRender(limitItems);
    } else {
      setItemsToRender(checkout.items);
    }
  }, [checkout.items, showFullList]);

  return (
    <TransitionGroup>
      <CSSTransition key={checkout.id} timeout={450} classNames="slide" appear>
        <CheckoutCardDiv
          fullScreen={showFullList}
          onClick={() => checkoutsActions.showMoreDetails(checkout.id)}
        >
          <Header checkout={checkout} />
          <ItemsContainer>
            {itemsToRender.map((item) => (
              <Item key={item.gtin} itemData={item} />
            ))}
          </ItemsContainer>
        </CheckoutCardDiv>
      </CSSTransition>
    </TransitionGroup>
  );
}

function shouldRender(prevProps, nextProps) {
  if (prevProps !== nextProps) return true;
}

export default React.memo(CheckoutCard, shouldRender);
