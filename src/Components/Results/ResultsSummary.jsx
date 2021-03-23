import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import amountToWords from '../../Utils/amountToWords';
import calculateResultsSummary from '../../Utils/calculateResultsSummary';

export default function ResultsSummary({ values }) {
  const {
    amount,
    interest,
    duration,
  } = values;
  const { durationWord, interestTypeWord, total } = calculateResultsSummary(values);

  return (
    <>
      <Typography variant="h6" component="p">
        Poskytnete nám zápůjčku ve výši
        {' '}
        <b>
          {amount}
          {' '}
          Kč
        </b>
        {' '}
        (slovy
        {' '}
        {amountToWords(amount)}
        ), kterou vám vrátíme nejpozději
        {' '}
        <b>
          za
          {' '}
          {duration}
          {' '}
          {durationWord}
          {' '}
          včetně
          {' '}
          {interestTypeWord}
          {' '}
          úroku
          {' '}
          {interest}
          {' '}
          %
        </b>
        , celkem tedy
        {' '}
        <b>
          {total}
          {' '}
          Kč
        </b>
        {' '}
        (slovy
        {' '}
        {amountToWords(total)}
        ).
      </Typography>
      <TableContainer component={Paper} style={{ 'margin-top': 20 }}>
        <Table>
          <TableBody>
            <TableRow key="loan">
              <TableCell component="th" scope="row">Půjčíte</TableCell>
              <TableCell align="right">
                {amount}
                {' '}
                Kč
              </TableCell>
            </TableRow>
            <TableRow key="interest">
              <TableCell component="th" scope="row">Vrátíme</TableCell>
              <TableCell align="right">
                {total}
                {' '}
                Kč
              </TableCell>
            </TableRow>
            <TableRow key="interest">
              <TableCell component="th" scope="row">Rozdíl</TableCell>
              <TableCell align="right">
                {total - amount}
                {' '}
                Kč
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

ResultsSummary.propTypes = {
  values: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    interest_type: PropTypes.string.isRequired,
    interest: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
