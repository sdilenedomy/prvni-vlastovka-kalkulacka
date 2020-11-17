import React, { useState } from 'react';
import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './Components/Calculator';
import Results from './Components/Results';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
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
    <>
      <CssBaseline />
      <Box
        className={classes.root}
        display="flex"
        justifyContent="space-evenly"
        // flexWrap="wrap"
      >
        <Calculator
          onSubmit={handleSubmit}
          resultsShown={resultsShown}
        />
        {resultsShown && <Results values={values} />}
      </Box>
    </>
  );
}

export default App;