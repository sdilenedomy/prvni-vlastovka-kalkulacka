import React, { useState } from 'react';
import {
  createMuiTheme,
  CssBaseline,
  Grid,
  MuiThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './Components/Calculator';
import Results from './Components/Results';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

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
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
