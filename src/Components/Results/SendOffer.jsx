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

const useStyles = makeStyles((theme) => ({
  captcha: {
    marginTop: theme.spacing(2),
  },
}));

export default function SendOffer({
  onOfferSubmit, setHCaptchaToken, hCaptchaRef, closeDialog,
}) {
  const classes = useStyles();

  return (
    <>
      <DialogTitle>Nezávazně odeslat nabídku</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pokud chcete nezávazně odeslat nabídku družstvu, zadejte prosím svůj email.
        </DialogContentText>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={yup.object({
            email: yup.string()
              .email('Zadejte prosím platnou emailovou adresu')
              .required('Zadejte prosím emailovou adresu'),
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
                label="Váš email"
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
                  ref={hCaptchaRef}
                />
              </div>
            </Form>
          ))}
        </Formik>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeDialog} color="primary">Zrušit</Button>
        <Button type="submit" form="submit-offer-form" color="primary">Poslat nabídku</Button>
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
