/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import apiEndpoint from '../../config';

const ItemDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  flex: 0 0 49%;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  > * {
    margin: 0;
    padding: 0 0 0 10px;
    font-size: 0.7rem;
  }
`;

const Image = styled.img`
  height: 40px;
`;

export default function Item({ itemData }) {
  const { price: total, quantity, gtin } = itemData;
  const { name, brand } = itemData.product;
  const [imagePath, setImagePath] = useState('');
  const [itemPrice, setItemprice] = useState(0);

  const getProductImage = async () => {
    const { data } = await axios.get(`${apiEndpoint}/api/products/${gtin}`);
    setImagePath(data.path);
  };

  useEffect(() => {
    getProductImage();
    setItemprice((Math.round(total * 100) / 100).toFixed(2));
  }, []);

  return (
    <>
      <ItemDiv>
        <Image src={imagePath} alt={name} />
        <Details>
          <p className="title">{name}</p>
          <p className="brand">{brand}</p>
          <p className="data">
            {quantity} st &bull; {itemPrice} kr
          </p>
        </Details>
      </ItemDiv>
    </>
  );
}
