import React from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const useStyles = makeStyles((theme) => ({
  captcha: {
    marginTop: theme.spacing(2),
  },
}));

export default function SendOffer({
  onOfferSubmit, setHCaptchaToken, hCaptchaRef, closeDialog,
}) {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{t('Send offer heading')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('Enter email if want to send')}
        </DialogContentText>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={yup.object({
            email: yup.string()
              .email(t('Enter valid email'))
              .required(t('Enter email')),
          })}
          onSubmit={onOfferSubmit}
        >
          {((formikValues) => (
            <Form id="submit-offer-form">
              <TextField
                autoFocus
                fullWidth
                id="email"
                name="email"
                label={t('Your email')}
                value={formikValues.values.email}
                onChange={formikValues.handleChange}
                error={formikValues.touched.email && Boolean(formikValues.errors.email)}
                helperText={formikValues.touched.email && formikValues.errors.email}
                variant="outlined"
              />
              <div className={classes.captcha}>
                <HCaptcha
                  sitekey={process.env.REACT_APP_HCAPTCHA_SITEKEY}
                  onVerify={setHCaptchaToken}
                  languageOverride={i18next.language}
                  ref={hCaptchaRef}
                />
              </div>
            </Form>
          ))}
        </Formik>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeDialog} color="primary">{t('Cancel')}</Button>
        <Button type="submit" form="submit-offer-form" color="primary">{t('Send offer')}</Button>
      </DialogActions>
    </>
  );
}

SendOffer.propTypes = {
  onOfferSubmit: PropTypes.func.isRequired,
  setHCaptchaToken: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  hCaptchaRef: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
};
