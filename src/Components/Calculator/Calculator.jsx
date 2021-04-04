import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikFields from './FormikFields';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'max-content',
    margin: [theme.spacing(3.25), theme.spacing(2), 0, theme.spacing(2), ''].join('px '),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40%',
    },
  },
  calculator: {
    height: '100%',
    padding: theme.spacing(2),
  },
  body: {
    height: '100%',
  },
  title: {
    marginTop: '-30px',
    padding: theme.spacing(2),
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

export default function Calculator({
  resultsShown,
  onSubmit,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.root} flexGrow="1">
      <Paper className={classes.calculator}>
        <Box className={classes.body} display="flex" flexDirection="column">

          <Paper className={classes.title}>
            <Typography variant="h5" component="h1" align="center">
              Kalkulačka
            </Typography>
          </Paper>

          <Formik
            initialValues={{
              amount: '', duration: 1, interest_type: '', interest: '',
            }}
            validationSchema={yup.object({
              amount: yup.number()
                .min(5000, 'Minimální částka je 5000 Kč')
                .required('Zadejte prosím částku'),
              duration: yup.number()
                .required('Zvolte prosím trvání půjčky')
                .min(1)
                .max(15),
              interest_type: yup.string()
                .required(),
              interest: yup.number()
                .required(),
            })}
            onSubmit={onSubmit}
          >
            {((formikValues) => (
              <Form>
                <Box display="flex" flexDirection="column">
                  <FormikFields formikValues={formikValues} />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  flexGrow="1"
                >
                  {resultsShown ? (
                    <>
                      <p>Výsledky se automaticky změní podle zadaných hodnot.</p>
                      <AutoSubmit />
                    </>
                  ) : (
                    <Button type="submit">Spočítat</Button>
                  )}
                </Box>
              </Form>
            ))}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}

Calculator.propTypes = {
  resultsShown: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
