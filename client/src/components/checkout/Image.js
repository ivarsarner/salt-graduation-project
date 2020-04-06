import React from 'react';
import styled, { css } from 'styled-components';

const S = {};
S.Img = styled.img`
  height: 40px;
  border-radius: 10px;
  margin-right: 10px;
  ${(props) =>
    props.fullScreen &&
    css`
      margin-right: 0;
      height: 120px;
      margin-bottom: 1rem;
    `};
`;

S.CheckoutNumber = styled.p`
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 2rem;
  margin: 0;
`;

export default function Image({ imageData, fullScreen }) {
  // this should be replaced by a real checkout id from Firebase
  const randomId = Math.floor(Math.random() * 4 + 1);

  if (imageData !== undefined) {
    return (
      <S.Img
        src={imageData.imageUrl}
        alt={imageData.name}
        fullScreen={fullScreen}
      />
    );
  } else {
    return (
      <S.CheckoutNumber className="checkout-number">
        {randomId}
      </S.CheckoutNumber>
    );
  }
}
