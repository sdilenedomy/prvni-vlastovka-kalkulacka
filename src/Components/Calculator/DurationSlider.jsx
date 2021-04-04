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

export default function DurationSlider({ value, formikSetValue, name }) {
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
    if (value < 1) {
      setValue(1);
    } else if (value > 15) {
      setValue(15);
    }
  };

  return (
    <>
      <Typography
        id="input-slider"
        gutterBottom
        color={hasFocus ? 'primary' : 'textSecondary'}
      >
        Trvání půjčky v letech
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className={classes.slider}
      >
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            aria-labelledby="input-slider"
            min={1}
            max={15}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onFocus={() => setHasFocus(true)}
            onBlur={handleInputBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 15,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

DurationSlider.propTypes = {
  formikSetValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
