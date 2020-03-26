import React from 'react';

export default function Item({ itemData }) {
  const { price: total, quantity } = itemData;
  const { name, brand } = itemData.product;

  return (
    <>
      <div>IMAAAGE HERE LOL</div>
      <div>{name}</div>
      <div>
        {brand} &bull; {quantity}st &bull; {total}kr
      </div>
    </>
  );
}
