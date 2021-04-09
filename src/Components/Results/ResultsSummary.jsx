/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import amountToWords from '../../Utils/amountToWords';
import conjugateYears from '../../Utils/conjugateYears';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
  },
  summaryText: {
    overflowWrap: 'break-word',
    hyphens: 'auto',
  },
}));

export default function ResultsSummary({ values }) {
  const classes = useStyles();

  const {
    amount,
    interest,
    duration,
    interest_type: interestType,
  } = values;

  const durationWord = conjugateYears(duration);

  const total = Math.ceil(amount + amount * ((parseFloat(interest) * duration) / 100));

  return (
    <>
      <Typography variant="h6" component="p" className={classes.summaryText} lang="cs">
        Poskytnete nám zápůjčku ve výši <b>{amount}&nbsp;Kč</b> (slovy {amountToWords(amount)}),
        kterou vám vrátíme nejpozději za <b>{duration} {durationWord}</b>
        { interestType === 'end' && (
          <> spolu s úrokem <b>{interest}&nbsp;%</b>. </>
        )}
        { interestType === 'yearly' && (
          <>. Úrok ve výši <b>{interest}&nbsp;%</b> vám budeme vyplácet průběžně po letech. </>
        )}
        Celkem vám tedy vrátíme <b>{total}&nbsp;Kč</b> (slovy {amountToWords(total)}).
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableBody>
            <TableRow key="loan">
              <TableCell component="th" scope="row">Půjčíte</TableCell>
              <TableCell align="right">
                {amount} Kč
              </TableCell>
            </TableRow>
            <TableRow key="interest">
              <TableCell component="th" scope="row">Vrátíme</TableCell>
              <TableCell align="right">
                {total} Kč
              </TableCell>
            </TableRow>
            <TableRow key="total">
              <TableCell component="th" scope="row">Rozdíl</TableCell>
              <TableCell align="right">
                {total - amount} Kč
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
    interest: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};
