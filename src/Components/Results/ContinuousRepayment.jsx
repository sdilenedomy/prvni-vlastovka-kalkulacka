import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
export default function ContinuousRepayment({ values }) {
  return (
    <>
      Not implemented.
    </>
  );
}

ContinuousRepayment.propTypes = {
  values: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    interest: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
