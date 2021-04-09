import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Grid, Input, Slider, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  slider: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default function SliderWithInput({
  value, formikSetValue, name, min, max, step, label, endAdornment,
}) {
  const classes = useStyles();

  const [hasFocus, setHasFocus] = useState(false);

  function setValue(newValue) {
    formikSetValue(name, newValue);
  }

  function handleSliderChange(event, newValue) {
    setValue(newValue);
  }

  function handleInputChange(event) {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  }

  const handleInputBlur = () => {
    setHasFocus(false);
    const offset = value % step;
    if (offset < step / 2) {
      setValue(value - offset);
    } else {
      setValue(value + (step - offset));
    }
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <>
      <Typography
        id="input-slider"
        gutterBottom
        color={hasFocus ? 'primary' : 'textSecondary'}
      >
        {label}
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className={classes.slider}
      >
        <Grid item xs={9} sm={8} md={10} lg={10}>
          <Slider
            value={typeof value === 'number' ? value : min}
            onChange={handleSliderChange}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            step={step}
          />
        </Grid>
        <Grid item xs={3} sm={4} md={2} lg={2}>
          <Input
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onFocus={() => setHasFocus(true)}
            onBlur={handleInputBlur}
            inputProps={{
              step,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            endAdornment={endAdornment}
          />
        </Grid>
      </Grid>
    </>
  );
}

SliderWithInput.propTypes = {
  formikSetValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  endAdornment: PropTypes.node,
};

SliderWithInput.defaultProps = {
  endAdornment: '',
};
