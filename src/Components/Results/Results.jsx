import PropTypes from 'prop-types';
import React from 'react';
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AllAtOnce from './AllAtOnce';
import ContinuousRepayment from './ContinuousRepayment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    paddingLeft: theme.spacing(2),
  },
  results: {
    padding: theme.spacing(2),
    height: '100%',
  },
  body: {
    height: '100%',
  },
  title: {
    marginTop: '-30px',
    padding: theme.spacing(2),
  },
  buttonPadding: {
    paddingRight: theme.spacing(2),
  },
  resultsText: {
    hyphens: 'auto',
    padding: theme.spacing(2),
  },
}));

export default function Results({ values }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} flexGrow={3}>
      <Paper className={classes.results}>
        <Box display="flex" flexDirection="column" className={classes.body}>

          <Paper className={classes.title}>
            <Typography variant="h5" component="h1" align="center">
              Výsledky
            </Typography>
          </Paper>

          <div className={classes.resultsText}>
            {values.frequency === 'all' ? (
              <AllAtOnce values={values} />
            ) : (
              <ContinuousRepayment values={values} />
            )}
          </div>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            flexGrow="1"
          >
            <div className={classes.buttonPadding}>
              <Button>Stáhnout smlouvu</Button>
            </div>
            <Button>Poslat nabídku</Button>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
}

Results.propTypes = {
  values: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    interest: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
