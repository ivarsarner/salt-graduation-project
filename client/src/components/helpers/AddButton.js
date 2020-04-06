import React, { useContext } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import Button from './Button';

function AddButton() {
  const { checkoutsActions } = useContext(CheckoutContext);
  return <Button onClick={checkoutsActions.addNewCheckout}>Add New</Button>;
}

export default AddButton;
