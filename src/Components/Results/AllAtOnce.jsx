import React from 'react';
import PropTypes from 'prop-types';
import amountToWords from '../../Utils/amountToWords';

export default function AllAtOnce({ values }) {
  let { amount, interest, duration } = values;
  amount = parseInt(amount, 10);
  interest = parseInt(interest, 10);
  duration = parseInt(duration, 10);

  const repayment = Math.ceil(amount + amount * (interest / 100));

  return (
    <>
      Poskytnete nám zápůjčku ve výši
      {' '}
      {amount}
      {' '}
      Kč (slovy
      {' '}
      {amountToWords(amount)}
      ), kterou vám vrátíme nejpozději za
      {' '}
      {duration}
      {' '}
      let včetně úroku
      {' '}
      {interest}
      %, celkem tedy
      {' '}
      {repayment}
      {' '}
      Kč (slovy
      {' '}
      {amountToWords(repayment)}
      ).
    </>
  );
}

AllAtOnce.propTypes = {
  values: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    interest: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
