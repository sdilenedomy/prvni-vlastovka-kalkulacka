import React from 'react';
import { Box, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RadioField from './RadioField';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '30px',
  },
}));

export default function Fields({
  onChange, register, setValue, errors,
}) {
  const classes = useStyles();

  const radioFields = [
    {
      label: 'Frekvence splátek',
      name: 'frequency',
      options: [
        {
          label: 'Měsíční',
          value: 'monthly',
        },
        {
          label: 'Čtvrtletní',
          value: 'quarterly',
        },
        {
          label: 'Roční',
          value: 'yearly',
        },
        {
          label: 'Vše na konci',
          value: 'all',
        },
      ],
    },
    {
      label: 'Výše úroku',
      name: 'interest',
      options: [
        {
          label: '0%',
          value: '0',
        },
        {
          label: '1%',
          value: '1',
        },
        {
          label: '2%',
          value: '2',
        },
        {
          label: '5%',
          value: '5',
        },
      ],
    },
    {
      label: 'Trvání půjčky',
      name: 'duration',
      options: [
        {
          label: '1 rok',
          value: '1',
        },
        {
          label: '2 roky',
          value: '2',
        },
        {
          label: '5 let',
          value: '5',
        },
        {
          label: '10 let',
          value: '10',
        },
      ],
    },
  ];

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>

      <TextField
        name="amount"
        variant="outlined"
        label="Chci vám půjčit"
        type="number"
        error={!!errors.amount}
        helperText={errors.amount ? errors.amount.message : ''}
        inputRef={register({ required: 'Zadejte prosím částku' })}
        InputProps={{ endAdornment: <InputAdornment position="end">Kč</InputAdornment> }}
        onChange={onChange}
      />

      {radioFields.map((field) => (
        <RadioField
          data={field}
          onChange={onChange}
          register={register}
          setValue={setValue}
          errors={errors}
          key={field.name}
        />
      ))}

    </Box>
  );
}

Fields.propTypes = {
  onChange: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};
