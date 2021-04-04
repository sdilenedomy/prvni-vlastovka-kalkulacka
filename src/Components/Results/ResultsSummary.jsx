/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import amountToWords from '../../Utils/amountToWords';

export default function ResultsSummary({ values }) {
  const {
    amount,
    interest,
    duration,
    interest_type: interestType,
  } = values;

  let durationWord;
  if (duration === 1) {
    durationWord = 'rok';
  } else if (duration >= 2 && duration <= 4) {
    durationWord = 'roky';
  } else {
    durationWord = 'let';
  }

  const total = Math.ceil(amount + amount * ((parseFloat(interest) * duration) / 100));

  return (
    <>
      <Typography variant="h6" component="p">
        Poskytnete nám zápůjčku ve výši <b>{amount} Kč</b> (slovy {amountToWords(amount)}),
        kterou vám vrátíme nejpozději za <b>{duration} {durationWord}</b>
        { interestType === 'end' && (
          <> spolu s úrokem <b>{interest} %</b>. </>
        )}
        { interestType === 'yearly' && (
          <>. Úrok ve výši <b>{interest} %</b> vám budeme vyplácet průběžně po letech. </>
        )}
        Celkem vám tedy vrátíme <b>{total} Kč</b> (slovy {amountToWords(total)}).
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
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
            <TableRow key="total">
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
    amount: PropTypes.number.isRequired,
    interest_type: PropTypes.string.isRequired,
    interest: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};
