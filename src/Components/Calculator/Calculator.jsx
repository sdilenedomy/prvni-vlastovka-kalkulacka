import PropTypes from 'prop-types';
import React from 'react';
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Fields from './Fields';

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

export default function Calculator({
  resultsShown,
  onSubmit,
}) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    setValue,
    errors,
  } = useForm();

  function handleFieldChange() {
    if (resultsShown) {
      handleSubmit(onSubmit)();
    }
  }

  return (
    <Box className={classes.root} flexGrow="1">
      <Paper className={classes.calculator}>
        <Box className={classes.body} display="flex" flexDirection="column">

          <Paper className={classes.title}>
            <Typography variant="h5" component="h1" align="center">
              Kalkulačka
            </Typography>
          </Paper>

          <Fields
            onChange={handleFieldChange}
            register={register}
            setValue={setValue}
            errors={errors}
          />

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            flexGrow="1"
          >
            {resultsShown ? (
              <p>Výsledky se automaticky změní podle zadaných hodnot.</p>
            ) : (
              <Button onClick={handleSubmit(onSubmit)}>Spočítat</Button>
            )}
          </Box>

        </Box>
      </Paper>
    </Box>
  );
}

Calculator.propTypes = {
  resultsShown: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
