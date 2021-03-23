import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useSnackbar } from 'notistack';
import ResultsSummary from './ResultsSummary';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'min-content',
    maxWidth: '100%',
    margin: [theme.spacing(3.25), theme.spacing(2), 0, theme.spacing(2), ''].join('px '),
  },
  results: {
    padding: theme.spacing(2),
    height: '100%',
  },
  body: {
    height: '100%',
  },
  title: {
    marginTop: '-30px',
    padding: theme.spacing(2),
  },
  buttonPadding: {
    paddingRight: theme.spacing(2),
  },
  resultsText: {
    padding: theme.spacing(2),
  },
  captcha: {
    paddingTop: theme.spacing(2),
  },
}));

export default function Results({ values }) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [submitOfferDialogOpen, setSubmitOfferDialogOpen] = useState(false);
  const {
    handleSubmit,
    register,
    errors,
  } = useForm();

  const [hCaptchaToken, setHCaptchaToken] = useState(null);
  const hCaptchaRef = useRef(null);

  function resetHCaptcha() {
    hCaptchaRef.current.resetCaptcha();
    setHCaptchaToken(null);
  }

  function closeOfferSubmitDialog() {
    resetHCaptcha();
    setSubmitOfferDialogOpen(false);
  }

  function onOfferSubmit({ email }) {
    if (hCaptchaToken) {
      fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          contact_email: email,
          token: hCaptchaToken,
        }),
      })
        .then((r) => {
          if (r.ok) {
            enqueueSnackbar('Nabídka byla odeslána', { variant: 'success' });
            closeOfferSubmitDialog();
          } else {
            enqueueSnackbar('Došlo k chybě, zkuste to prosím později', { variant: 'error' });
            resetHCaptcha();
          }
        }).catch(() => {
          enqueueSnackbar('Došlo k chybě, zkuste to prosím později', { variant: 'error' });
          resetHCaptcha();
        });
    } else {
      enqueueSnackbar('Vyplňte prosím hCapthu', { variant: 'error' });
    }
  }

  return (
    <>
      <Box className={classes.root} flexGrow="3">
        <Paper className={classes.results}>
          <Box display="flex" flexDirection="column" className={classes.body}>

            <Paper className={classes.title}>
              <Typography variant="h5" component="h1" align="center">
                Výsledky
              </Typography>
            </Paper>

            <div className={classes.resultsText}>
              <ResultsSummary values={values} />
            </div>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              flexGrow="1"
            >
              <div className={classes.buttonPadding}>
                <a href="smlouva.odt">
                  <Button>Stáhnout smlouvu</Button>
                </a>
              </div>
              <Button onClick={() => setSubmitOfferDialogOpen(true)}>Poslat nabídku</Button>
            </Box>

          </Box>
        </Paper>
      </Box>

      <Dialog open={submitOfferDialogOpen} onClose={closeOfferSubmitDialog}>
        <DialogTitle>Nezávazně odeslat nabídku</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pokud chcete nezávazně odeslat nabídku družstvu, zadejte prosím svůj email.
          </DialogContentText>

          <form id="submit-offer-form" onSubmit={handleSubmit(onOfferSubmit)} noValidate>
            <TextField
              autoFocus
              variant="outlined"
              label="Váš email"
              type="email"
              name="email"
              fullWidth
              inputRef={register({
                required: 'Zadejte prosím svou emailovou adresu',
                // eslint-disable-next-line no-control-regex
                pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <div className={classes.captcha}>
              <HCaptcha
                sitekey={process.env.REACT_APP_HCAPTCHA_SITEKEY}
                onVerify={setHCaptchaToken}
                ref={hCaptchaRef}
              />
            </div>
          </form>

        </DialogContent>

        <DialogActions>
          <Button onClick={closeOfferSubmitDialog} color="primary">Zrušit</Button>
          <Button type="submit" form="submit-offer-form" color="primary">Poslat nabídku</Button>
        </DialogActions>

      </Dialog>

    </>
  );
}

Results.propTypes = {
  values: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    interest_type: PropTypes.string.isRequired,
    interest: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
