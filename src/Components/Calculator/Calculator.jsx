import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  Box,
  Button, Divider, Grid, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikFields from './FormikFields';
import localNumber from '../../Utils/localNumber';

const useStyles = makeStyles((theme) => ({
  calculator: {
    height: '100%',
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(-4),
    padding: theme.spacing(2),
  },
  buttonsWrapper: {
    marginTop: theme.spacing(2),
  },
  formFields: {
    marginTop: theme.spacing(2),
  },
  content: {
    height: '100%',
  },
  note: {
    marginTop: theme.spacing(2),
  },
}));

function AutoSubmit() {
  const {
    values,
    submitForm,
  } = useFormikContext();
  useEffect(() => {
    submitForm();
  }, [values, submitForm]);
  return null;
}

function AutoCurrencyRevalidate({ userCurrency }) {
  const { validateForm } = useFormikContext();
  useEffect(() => {
    validateForm();
  }, [userCurrency, validateForm]);
  return null;
}

export default function Calculator({
  resultsShown,
  onSubmit,
}) {
  const classes = useStyles();

  const { t } = useTranslation();

  const possibleCurrencies = JSON.parse(process.env.REACT_APP_CURRENCIES);
  const defaultCurrency = possibleCurrencies[0];
  const [userCurrency, setUserCurrency] = useState(defaultCurrency);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box display="flex" flexDirection="column" className={classes.content}>
        <Paper className={classes.calculator}>
          <Box display="flex" flexDirection="column" className={classes.content}>
            <Paper className={classes.title}>
              <Typography variant="h5" component="h2" align="center">
                {t('Calculator')}
              </Typography>
            </Paper>

            <Formik
              initialValues={{
                amount: '', currency: defaultCurrency, duration: 1, interest_type: '', interest: 0,
              }}
              validationSchema={yup.object({
                amount: yup.number()
                  .min(
                    JSON.parse(process.env.REACT_APP_MIN_AMOUNTS)[
                      possibleCurrencies.indexOf(userCurrency)],
                    t('Lowest amount', {
                      amount: `${localNumber(JSON.parse(process.env.REACT_APP_MIN_AMOUNTS)[
                        possibleCurrencies.indexOf(userCurrency)])} ${userCurrency}`,
                    }),
                  )
                  .required(t('Enter value')),
                currency: yup.string()
                  .required(),
                duration: yup.number()
                  .required(t('Select duration'))
                  .min(1)
                  .max(15),
                interest_type: yup.string()
                  .required(),
                interest: yup.number()
                  .min(0)
                  .max(3)
                  .required(),
              })}
              onSubmit={onSubmit}
            >
              {((formikValues) => (
                <Form className={classes.content}>
                  <Box display="flex" flexDirection="column" className={classes.content}>

                    <div className={classes.formFields}>
                      <FormikFields formikValues={formikValues} setUserCurrency={setUserCurrency} />
                    </div>

                    <Divider className={classes.note} />

                    <Typography className={classes.note} color="textSecondary">
                      <Trans i18nKey="Different terms">
                        Different terms <a href={`mailto:${t('Different terms email')}`}>email</a> call.
                      </Trans>
                    </Typography>

                    <Typography className={classes.note} color="textSecondary">
                      <Trans i18nKey="More info">
                        More info <a href={t('More info link')}>HERE</a>
                      </Trans>
                    </Typography>

                    <Typography className={classes.note} color="textSecondary">
                      {t('Disclaimer')}
                    </Typography>

                    <Box
                      className={classes.buttonsWrapper}
                      display="flex"
                      justifyContent={resultsShown ? 'center' : 'flex-end'}
                      alignItems="flex-end"
                      flexGrow="1"
                    >
                      {resultsShown ? (
                        <>
                          <p>{t('Results automatic')}</p>
                          <AutoSubmit />
                        </>
                      ) : (
                        <>
                          <Button type="submit">{t('Calculate')}</Button>
                          <AutoCurrencyRevalidate userCurrency={userCurrency} />
                        </>
                      )}
                    </Box>
                  </Box>
                </Form>
              ))}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

Calculator.propTypes = {
  resultsShown: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
