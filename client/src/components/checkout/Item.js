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
      <div className="checkout-card__bottom">
        <div className="checkout-card__bottom__left">
          <div className="checkout-card__bottom__product__img">
            <img src={imagePath} alt="product" style={{ width: '60px' }} />
          </div>
        </div>

        <div className="checkout-card__bottom__right">
          <div className="checkout-card__bottom__product__name">{name}</div>
          <div className="checkout-card__bottom__product__details">
            {brand} &bull; {quantity} st &bull; {total} kr
          </div>
        </div>
      </div>
    </>
  );
}
