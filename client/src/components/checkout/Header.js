import React from 'react';
import Moment from 'react-moment';

export default function Header(props) {
  return (
    <div className="checkout-card__header">
      <p>
        Time: <Moment fromNow>{data.timeCreated}</Moment>
      </p>
      <p>{checkoutTotal} items</p>;
    </div>
  );
}
