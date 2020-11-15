import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  FormControl, FormControlLabel, FormLabel, RadioGroup, Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
}));

export default function RadioField({
  data, onChange, register, setValue, errors,
}) {
  const { label, name, options } = data;

  const classes = useStyles();

  const handleChange = (e) => {
    setValue(name, e.target.value);
    onChange();
  };
  useEffect(() => {
    register(name, {
      required: true,
    });
  }, [name, register]);

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" error={!!errors[name]}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={name}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

RadioField.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};
