import React, { useState } from 'react';
import {
  Button, Menu, MenuItem, Tooltip,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

export default function LanguageSwitcher() {
  const classes = useStyles();

  const { t } = useTranslation();

  const supportedLangs = JSON.parse(process.env.REACT_APP_SUPPORTED_LANGS);
  const supportedLangNames = JSON.parse(process.env.REACT_APP_SUPPORTED_LANGS_NAMES);

  const indexOfUserLang = supportedLangs.indexOf(i18next.language);
  const userLangName = supportedLangNames[indexOfUserLang];

  const [languageMenu, setLanguageMenu] = useState(null);

  const handleLanguageIconClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const handleLanguagePick = (langCode) => {
    i18next.changeLanguage(langCode);
    window.localStorage.setItem('i18nextLng', langCode);
    handleLanguageMenuClose();
  };

  return (
    <>
      <Tooltip title={t('Change language')} enterDelay={300}>
        <Button
          color="inherit"
          onClick={handleLanguageIconClick}
        >
          <LanguageIcon />
          <span className={classes.language}>
            {userLangName}
          </span>
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>
      <Menu
        open={Boolean(languageMenu)}
        anchorEl={languageMenu}
        onClose={handleLanguageMenuClose}
      >
        {supportedLangs.map((langCode, index) => (
          <MenuItem
            key={langCode}
            selected={index === indexOfUserLang}
            onClick={() => handleLanguagePick(langCode)}
            lang={langCode}
          >
            {supportedLangNames[index]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
