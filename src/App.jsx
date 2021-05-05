import React, { useState } from 'react';
import {
  AppBar,
  createMuiTheme,
  CssBaseline,
  Grid, IconButton,
  MuiThemeProvider,
  responsiveFontSizes, Toolbar, Tooltip, Typography,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@material-ui/icons/GitHub';
import Results from './Components/Results';
import Calculator from './Components/Calculator';
import LanguageSwitcher from './Components/LanguageSwitcher';

const useStyles = makeStyles((theme) => ({
  root: {
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 48px)',
    },
    '@media (min-width:600px)': {
      minHeight: 'calc(100vh - 64px)',
    },
    minHeight: 'calc(100vh - 56px)',
  },
  offset: theme.mixins.toolbar,
  grow: {
    flex: '1 1 auto',
  },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  const classes = useStyles();

  const { t } = useTranslation();

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
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="h1">{t('Page title')}</Typography>
            <div className={classes.grow} />
            <LanguageSwitcher />
            <Tooltip title={t('GitHub')} enterDelay={300}>
              <IconButton
                component="a"
                color="inherit"
                href={process.env.REACT_APP_SOURCE_URL}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
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
