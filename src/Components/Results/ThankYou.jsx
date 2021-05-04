import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function ThankYou({ closeDialog }) {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{t('Thank you!')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('In 24 hours')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">{t('Ok')}</Button>
      </DialogActions>
    </>
  );
}

ThankYou.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};
