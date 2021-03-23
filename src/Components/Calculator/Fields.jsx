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
      label: 'Typ úroku',
      name: 'interest_type',
      options: [
        {
          label: 'Roční úročení',
          value: 'yearly',
        },
        {
          label: 'Jednorázový úrok',
          value: 'one-time',
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
          label: '0.5%',
          value: '0.5',
        },
        {
          label: '1%',
          value: '1',
        },
        {
          label: '1.5%',
          value: '1.5',
        },
        {
          label: '2%',
          value: '2',
        },
        {
          label: '2.5%',
          value: '2.5',
        },
        {
          label: '3%',
          value: '3',
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
        inputRef={register({ required: 'Zadejte prosím částku', min: { value: 5000, message: 'Minimální částka je 5000 Kč' } })}
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
