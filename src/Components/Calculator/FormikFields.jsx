import PropTypes from 'prop-types';
import React from 'react';
import {
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import SliderWithInput from './SliderWithInput';
import FormikRadioGroup from './FormikRadioGroup';

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(2),
  },
  amountField: {
    display: 'flex',
  },
  currency: {
    marginLeft: theme.spacing(1),
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
  const classes = useStyles();

  const { t } = useTranslation();

  const radioFields = [
    {
      label: t('Interest repayment type'),
      name: 'interest_type',
      options: [
        {
          label: t('Repayment type end'),
          value: 'end',
        },
        {
          label: t('Repayment type yearly'),
          value: 'yearly',
        },
      ],
    },
  ];

  return (
    <>
      <FieldWrapper>
        <div
          className={classes.amountField}
        >
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label={t('Want to lend')}
            type="number"
            value={formikValues.values.amount}
            onChange={formikValues.handleChange}
            error={formikValues.touched.amount && Boolean(formikValues.errors.amount)}
            helperText={formikValues.touched.amount && formikValues.errors.amount}
            variant="outlined"
          />
          <ToggleButtonGroup
            value={formikValues.values.currency}
            onChange={(_, newValue) => {
              if (newValue) {
                formikValues.setFieldValue('currency', newValue);
              }
            }}
            onBlur={formikValues.handleBlur('currency')}
            name="currency"
            className={classes.currency}
            exclusive
          >
            {JSON.parse(process.env.REACT_APP_CURRENCIES).map((currency) => (
              <ToggleButton key={currency} value={currency}>{currency}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </FieldWrapper>
      <FieldWrapper>
        <SliderWithInput
          name="duration"
          value={formikValues.values.duration}
          formikSetValue={formikValues.setFieldValue}
          max={15}
          min={1}
          step={1}
          label={t('Loan duration')}
        />
      </FieldWrapper>
      <FieldWrapper>
        <SliderWithInput
          name="interest"
          value={formikValues.values.interest}
          formikSetValue={formikValues.setFieldValue}
          max={3}
          min={0}
          step={0.5}
          label={t('Interest amount')}
        />
      </FieldWrapper>
      {radioFields.map((radioGroupProps) => (
        <FieldWrapper key={radioGroupProps.name}>
          <Field name={radioGroupProps.name}>
            {({ field, form }) => (
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
