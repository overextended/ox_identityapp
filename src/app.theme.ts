import { common } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';

export const APP_PRIMARY_COLOR = '#a6c8ff';

export const LIGHT_APP_TEXT_COLOR = '#00315f';
export const DARK_APP_TEXT_COLOR = common.black;

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#215fa6',
      dark: '#3275c2',
      light: '#215b9e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d32f2f',
      light: '#eb4242',
      dark: '#941212',
      contrastText: LIGHT_APP_TEXT_COLOR,
    },
    success: {
      main: '#2196f3',
      contrastText: LIGHT_APP_TEXT_COLOR,
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: APP_PRIMARY_COLOR,
      dark: '#78adf9',
      light: '#63E6BE',
      contrastText: LIGHT_APP_TEXT_COLOR,
    },
    secondary: {
      main: '#d32f2f',
      light: '#eb4242',
      dark: '#941212',
      contrastText: LIGHT_APP_TEXT_COLOR,
    },
    success: {
      main: '#2196f3',
      contrastText: LIGHT_APP_TEXT_COLOR,
    },
  },
};

export const themes: Record<'dark' | 'light', ThemeOptions> = {
  light: lightTheme,
  dark: darkTheme,
};
