import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import ResultsSummary from './ResultsSummary';
import SendOffer from './SendOffer';
import ThankYou from './ThankYou';
import Recapitulation from './Recapitulation';

const useStyles = makeStyles((theme) => ({
  results: {
    height: '100%',
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(-4),
    padding: theme.spacing(2),
  },
  summary: {
    marginTop: theme.spacing(2),
  },
  downloadButton: {
    marginRight: theme.spacing(1),
    textDecoration: 'none',
  },
  buttonsWrapper: {
    marginTop: theme.spacing(2),
  },
  captcha: {
    marginTop: theme.spacing(2),
  },
  content: {
    height: '100%',
  },
}));

export default function Results({ values }) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [submitOfferDialogOpen, setSubmitOfferDialogOpen] = useState(false);

  const [hCaptchaToken, setHCaptchaToken] = useState(null);
  const hCaptchaRef = useRef(null);

  const [sendOfferPhase, setSendOfferPhase] = useState(1);

  function resetHCaptcha() {
    hCaptchaRef.current.resetCaptcha();
    setHCaptchaToken(null);
  }

  function closeOfferSubmitDialog() {
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
            resetHCaptcha();
            setSendOfferPhase(sendOfferPhase + 1);
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
      <Grid item xs={12} sm={7} lg={8}>
        <Box display="flex" flexDirection="column" className={classes.content}>
          <Paper className={classes.results}>
            <Box display="flex" flexDirection="column" className={classes.content}>

              <Paper className={classes.title}>
                <Typography variant="h5" component="h1" align="center">
                  Výsledky
                </Typography>
              </Paper>

              <div className={classes.summary}>
                <ResultsSummary values={values} />
              </div>

              <Box
                className={classes.buttonsWrapper}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                flexGrow="1"
              >
                <a href="smlouva.odt" className={classes.downloadButton}>
                  <Button>Stáhnout smlouvu</Button>
                </a>
                <Button onClick={() => {
                  setSendOfferPhase(1);
                  setSubmitOfferDialogOpen(true);
                }}
                >
                  Poslat nabídku
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Grid>

      <Dialog open={submitOfferDialogOpen} onClose={closeOfferSubmitDialog}>
        {sendOfferPhase === 1 && (
          <Recapitulation
            closeDialog={closeOfferSubmitDialog}
            onContinue={() => setSendOfferPhase(sendOfferPhase + 1)}
            values={values}
          />
        )}
        {sendOfferPhase === 2 && (
          <SendOffer
            onOfferSubmit={onOfferSubmit}
            closeDialog={() => {
              closeOfferSubmitDialog();
              resetHCaptcha();
            }}
            hCaptchaRef={hCaptchaRef}
            setHCaptchaToken={setHCaptchaToken}
          />
        )}
        {sendOfferPhase === 3 && (
          <ThankYou
            closeDialog={closeOfferSubmitDialog}
          />
        )}
      </Dialog>
    </>
  );
}

Results.propTypes = {
  values: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    interest_type: PropTypes.string.isRequired,
    interest: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};
