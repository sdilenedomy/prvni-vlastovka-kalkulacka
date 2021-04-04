import React, { useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './Components/Calculator';
import Results from './Components/Results';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  const [resultsShown, setResultsShown] = useState(false);

  const [values, setValues] = useState({});

  function handleSubmit(data) {
    setValues(data);
    setResultsShown(true);
  }

  return (
    <SnackbarProvider maxSnack={1}>
      <CssBaseline />
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="stretch"
      >
        <Calculator
          onSubmit={handleSubmit}
          resultsShown={resultsShown}
        />
        {resultsShown && <Results values={values} />}
      </Grid>
    </SnackbarProvider>
  );
}

export default App;
