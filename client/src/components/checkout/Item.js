import React from 'react';

export default function Item({ itemData }) {
  const { name, brand } = itemData.product;
  const { price: total, quantity } = itemData;

  return (
    <li>
      <div>{name}</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </li>
  );
}
