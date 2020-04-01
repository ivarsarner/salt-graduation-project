import React from 'react';

export default function Controls({ setMobileView }) {
  return (
    <>
      <div className="controls">
        <button
          className="new-checkout-button"
          onClick={() => setMobileView(false)}
        >
          Checkouts
        </button>
        <button
          className="new-checkout-button"
          onClick={() => setMobileView(true)}
        >
          History
        </button>
      </div>
    </>
  );
}
