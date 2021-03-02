import React, { useState } from 'react';
import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Calculator from './Components/Calculator';
import Results from './Components/Results';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingBottom: theme.spacing(2),
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
      <Box
        className={classes.root}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Calculator
          onSubmit={handleSubmit}
          resultsShown={resultsShown}
        />
        {resultsShown && <Results values={values} />}
      </Box>
    </SnackbarProvider>
  );
}

export default App;
