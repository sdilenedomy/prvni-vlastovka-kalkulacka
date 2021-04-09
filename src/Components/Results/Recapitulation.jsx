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
import conjugateYears from '../../Utils/conjugateYears';

export default function Recapitulation({ closeDialog, onContinue, values }) {
  const {
    amount,
    interest,
    duration,
    // eslint-disable-next-line no-unused-vars
    interest_type: interestType,
  } = values;

  const durationWord = conjugateYears(duration);

  return (
    <>
      <DialogTitle>Rekapitulace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Než nabídku odešlete, zkontrolujte prosím její správnost.
        </DialogContentText>
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow key="amount">
                <TableCell component="th" scope="row">Velikost půjčky</TableCell>
                <TableCell align="right">
                  {amount} Kč
                </TableCell>
              </TableRow>
              <TableRow key="interest">
                <TableCell component="th" scope="row">Úrok</TableCell>
                <TableCell align="right">
                  {interest} %
                </TableCell>
              </TableRow>
              <TableRow key="duration">
                <TableCell component="th" scope="row">Trvání</TableCell>
                <TableCell align="right">
                  {duration} {durationWord}
                </TableCell>
              </TableRow>
              <TableRow key="interest-type">
                <TableCell component="th" scope="row">Vyplácení</TableCell>
                <TableCell align="right">
                  {interestType === 'end' ? (
                    'Úrok i jistina a konci'
                  ) : (
                    'Úrok průběžně, jistina na konci'
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">Zrušit</Button>
        <Button onClick={onContinue} color="primary">Pokračovat</Button>
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
    interest: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};
