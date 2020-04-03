import React, { useState, useEffect, useContext, forwardRef } from 'react';
import styled, { css } from 'styled-components';
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
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
  }
  ${(props) =>
    props.fullScreen &&
    css`
      box-shadow: none;
      position: relative;
      top: -40px;
      &:hover {
        transform: none;
        cursor: initial;
      }
    `};
`;

const CheckoutCard = forwardRef(
  ({ checkout, showFullScreen, hideHr, hideItems }, ref) => {
    const { checkoutsActions } = useContext(CheckoutContext);
    const [itemsToRender, setItemsToRender] = useState([]);

    useEffect(() => {
      if (!showFullScreen) {
        const limitItems = checkout.items.slice(-4);
        setItemsToRender(limitItems);
      } else {
        setItemsToRender(checkout.items);
      }
    }, [checkout.items, showFullScreen]);

    return (
      <div ref={ref}>
        <CheckoutCardDiv
          fullScreen={showFullScreen}
          onClick={() => checkoutsActions.showMoreDetails(checkout.id)}
        >
          <Header
            checkout={checkout}
            hideHr={hideHr}
            fullScreen={showFullScreen}
          />
          {!hideItems && (
            <ItemsContainer>
              {itemsToRender.map((item) => (
                <Item
                  key={item.gtin}
                  itemData={item}
                  fullScreen={showFullScreen}
                />
              ))}
            </ItemsContainer>
          )}
        </CheckoutCardDiv>
      </div>
    );
  }
);

function shouldRender(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default React.memo(CheckoutCard, shouldRender);
