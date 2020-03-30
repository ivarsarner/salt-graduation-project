import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Item({ itemData }) {
  const { price: total, quantity, gtin } = itemData;
  const { name, brand } = itemData.product;
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    getProductImage();
  }, []);

  const getProductImage = async () => {
    const { data } = await axios.get(`/api/products/${gtin}`);
    setImagePath(data.path);
  };

  return (
    <>
      <div className="item">
        <img src={imagePath} alt="product" style={{ width: '60px' }} />
        <div className="details">
          <p className="title">{name}</p>
          <p className="brand">{brand}</p>
          <p className="data">
            {quantity} st &bull; {total} kr
          </p>
        </div>
      </div>
    </>
  );
}
