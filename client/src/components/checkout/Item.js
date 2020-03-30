import React from 'react';
import axios from 'axios';

export default function Item({ itemData }) {
  const { price: total, quantity, gtin } = itemData;
  const { name, brand } = itemData.product;

  const getProductImage = async () => {
    const { path } = await axios.get(`/api/products/${gtin}`);
    return path;
  };

  return (
    <>
      <footer className="checkout-card__bottom">
        <section className="checkout-card__bottom__left">
          <div className="checkout-card__bottom__product__img">
            IMAAAGE HERE LOL
          </div>
        </section>

        <section className="checkout-card__bottom__right">
          <div className="checkout-card__bottom__product__name">{name}</div>
          <div className="checkout-card__bottom__product__details">
            {brand} &bull; {quantity} st &bull; {total} kr
          </div>
        </section>
      </footer>
    </>
  );
}
