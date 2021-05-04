import React, { useState, Suspense } from 'react';
import {
  createMuiTheme,
  CssBaseline,
  Grid,
  MuiThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Results from './Components/Results';
import Calculator from './Components/Calculator';

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
    <Suspense fallback="">
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
    </Suspense>
  );
}

export default App;
