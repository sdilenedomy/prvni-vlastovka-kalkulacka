import React, { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Calculator from './Components/Calculator';
import Results from './Components/Results';

function App() {
  const [resultsShown, setResultsShown] = useState(false);

  const [values, setValues] = useState({});

  function handleSubmit(data) {
    setValues(data);
    setResultsShown(true);
  }

  return (
    <SnackbarProvider maxSnack={1}>
      <CssBaseline />
      <Calculator
        onSubmit={handleSubmit}
        resultsShown={resultsShown}
      />
      {resultsShown && <Results values={values} />}
    </SnackbarProvider>
  );
}

export default App;
