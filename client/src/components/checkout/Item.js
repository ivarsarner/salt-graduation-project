import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Item({ itemData }) {
  const { price: total, quantity, gtin } = itemData;
  const { name, brand } = itemData.product;
  const [imagePath, setImagePath] = useState('');
  const [itemPrice, setItemprice] = useState(0);

  useEffect(() => {
    getProductImage();
    setItemprice((Math.round(total * 100) / 100).toFixed(2));
  }, []);

  const getProductImage = async () => {
    const { data } = await axios.get(`/api/products/${gtin}`);
    setImagePath(data.path);
  };

  return (
    <>
      <div className="item">
        <img src={imagePath} alt="product" />
        <div className="details">
          <p className="title">{name}</p>
          <p className="brand">{brand}</p>
          <p className="data">
            {quantity} st &bull; {itemPrice} kr
          </p>
        </div>
      </div>
    </>
  );
}
