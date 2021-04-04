import PropTypes from 'prop-types';
import React from 'react';
import {
  InputAdornment, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';
import DurationSlider from './DurationSlider';
import FormikRadioGroup from './FormikRadioGroup';

const useStyles = makeStyles((theme) => ({
  field: {
    paddingTop: theme.spacing(3),
  },
}));

function FieldWrapper({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.field}>
      { children }
    </div>
  );
}

FieldWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function FormikFields({ formikValues }) {
  // eslint-disable-next-line no-unused-vars
  const radioFields = [
    {
      label: 'Způsob vyplácení úroku',
      name: 'interest_type',
      options: [
        {
          label: 'Úrok i jistina na konci',
          value: 'end',
        },
        {
          label: 'Úrok vyplácený po letech, jistina na konci',
          value: 'yearly',
        },
      ],
    },
    {
      label: 'Výše úroku',
      name: 'interest',
      options: [
        {
          label: '0 %',
          value: '0',
        },
        {
          label: '0.5 %',
          value: '0.5',
        },
        {
          label: '1 %',
          value: '1',
        },
        {
          label: '1.5 %',
          value: '1.5',
        },
        {
          label: '2 %',
          value: '2',
        },
        {
          label: '2.5 %',
          value: '2.5',
        },
        {
          label: '3 %',
          value: '3',
        },
      ],
    },
  ];

  return (
    <>
      <FieldWrapper>
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Chci vám půjčit"
          type="number"
          value={formikValues.values.amount}
          onChange={formikValues.handleChange}
          error={formikValues.touched.amount && Boolean(formikValues.errors.amount)}
          helperText={formikValues.touched.amount && formikValues.errors.amount}
          InputProps={{ endAdornment: <InputAdornment position="end">Kč</InputAdornment> }}
          variant="outlined"
        />
      </FieldWrapper>
      <FieldWrapper>
        <DurationSlider
          name="duration"
          value={formikValues.values.duration}
          formikSetValue={formikValues.setFieldValue}
        />
      </FieldWrapper>
      {radioFields.map((radioGroupProps) => (
        <FieldWrapper key={radioGroupProps.name}>
          <Field name={radioGroupProps.name}>
            {({ field, form }) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <FormikRadioGroup {...radioGroupProps} field={field} form={form} />
            )}
          </Field>
        </FieldWrapper>
      ))}
    </>
  );
}

FormikFields.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formikValues: PropTypes.object.isRequired,
};
