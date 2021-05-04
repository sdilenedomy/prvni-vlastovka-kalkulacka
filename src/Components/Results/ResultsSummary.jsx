/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import amountToWords from '../../Utils/amountToWords';

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

  const { t } = useTranslation();

  const {
    amount,
    interest,
    duration,
    interest_type: interestType,
  } = values;

  const total = Math.ceil(amount + amount * ((parseFloat(interest) * duration) / 100));
  const totalWords = amountToWords(total);
  const amountWords = amountToWords(amount);

  const summaryValues = {
    amount,
    amountWords,
    duration,
    interest,
    total,
    totalWords,
  };

  return (
    <>
      <Typography variant="h6" component="p" className={classes.summaryText}>
        { interestType === 'end' && (
          t('Summary interest type end', summaryValues)
        )}
        { interestType === 'yearly' && (
          t('Summary interest type yearly', summaryValues)
        )}
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableBody>
            <TableRow key="loan">
              <TableCell component="th" scope="row">{t('You lend')}</TableCell>
              <TableCell align="right">
                {amount} Kč
              </TableCell>
            </TableRow>
            <TableRow key="interest">
              <TableCell component="th" scope="row">{t('We give back')}</TableCell>
              <TableCell align="right">
                {total} Kč
              </TableCell>
            </TableRow>
            <TableRow key="total">
              <TableCell component="th" scope="row">{t('Difference')}</TableCell>
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
