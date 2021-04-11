import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Box,
  Button, Divider, Grid, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikFields from './FormikFields';

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

export default function Calculator({
  resultsShown,
  onSubmit,
}) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={5} lg={4}>
      <Box display="flex" flexDirection="column" className={classes.content}>
        <Paper className={classes.calculator}>
          <Box display="flex" flexDirection="column" className={classes.content}>
            <Paper className={classes.title}>
              <Typography variant="h5" component="h1" align="center">
                Kalkulačka
              </Typography>
            </Paper>

            <Formik
              initialValues={{
                amount: '', duration: 1, interest_type: '', interest: 0,
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
                      <FormikFields formikValues={formikValues} />
                    </div>

                    <Divider className={classes.note} />

                    <Typography className={classes.note} color="textSecondary">
                      Rádi byste nám poskytli půjčku za jiných podmínek? Napište nám na
                      {' '}
                      <a href="mailto:finance@sdilenedomy.cz">finance@sdilenedomy.cz</a>
                      {' '}
                      nebo volejte na +420776381312.
                    </Typography>

                    <Typography className={classes.note} color="textSecondary">
                      Výpočet v kalkulačce na těchto webových stránkách je orientační a
                      není nabídkou k uzavření smlouvy, příslibem k uzavření smlouvy,
                      veřejnou nabídkou ani jakýmkoliv jiným právním jednáním
                      První vlaštovky, sociálního družstva a je výhradně právně
                      nezávazným informativním sdělením, i pokud tak není zvlášť označen.
                    </Typography>

                    <Box
                      className={classes.buttonsWrapper}
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
