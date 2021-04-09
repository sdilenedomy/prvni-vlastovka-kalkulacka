import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export default function ThankYou({ closeDialog }) {
  return (
    <>
      <DialogTitle>Děkujeme!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nabídka byla odeslána. Nejpozději do 24 hodin se vám ozveme na uvedenou emailovou adresu.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">Budiž</Button>
      </DialogActions>
    </>
  );
}

ThankYou.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};
