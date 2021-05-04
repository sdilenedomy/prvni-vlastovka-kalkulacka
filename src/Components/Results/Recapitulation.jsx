/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Divider, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Recapitulation({ closeDialog, onContinue, values }) {
  const { t } = useTranslation();

  const {
    amount,
    interest,
    duration,
    // eslint-disable-next-line no-unused-vars
    interest_type: interestType,
  } = values;

  return (
    <>
      <DialogTitle>{t('Recapitulation')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('Check if correct')}
        </DialogContentText>
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow key="amount">
                <TableCell component="th" scope="row">{t('Loan amount')}</TableCell>
                <TableCell align="right">
                  {amount} Kč
                </TableCell>
              </TableRow>
              <TableRow key="interest">
                <TableCell component="th" scope="row">{t('Interest')}</TableCell>
                <TableCell align="right">
                  {interest} %
                </TableCell>
              </TableRow>
              <TableRow key="duration">
                <TableCell component="th" scope="row">{t('Duration')}</TableCell>
                <TableCell align="right">
                  {t('Duration years', { count: duration })}
                </TableCell>
              </TableRow>
              <TableRow key="interest-type">
                <TableCell component="th" scope="row">{t('Repayment')}</TableCell>
                <TableCell align="right">
                  {interestType === 'end' ? (
                    t('Repayment type end')
                  ) : (
                    t('Repayment type yearly')
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">{t('Cancel')}</Button>
        <Button onClick={onContinue} color="primary">{t('Continue')}</Button>
      </DialogActions>
    </>
  );
}

Recapitulation.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    interest_type: PropTypes.string.isRequired,
    interest: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};
