import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

// TODO: Set font defaults based on design
export const sansSerifFontFamily = [
  'Helvetica Neue',
  'Arial Nova',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(', ');
export const serifFontFamily = ['Georgia', 'Times New Roman', 'serif'].join(
  ','
);
export const APP_TRANSITION_TIME = '250ms';

// TODO: Define colors sets for use
export const Colors = {
  black: '#000000',
  white: '#ffffff',
};

// TODO: Theme overrides based on design
const theme: Theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFontFamily,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFontFamily,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFontFamily,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFontFamily,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFontFamily,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: sansSerifFontFamily,
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiInputLabel: {
      required: false,
    },
  },
  typography: {
    body1: {
      fontFamily: sansSerifFontFamily,
    },
    body2: {
      fontFamily: sansSerifFontFamily,
    },
    button: {
      fontFamily: sansSerifFontFamily,
    },
    fontFamily: sansSerifFontFamily,
    fontSize: 14,
    h1: {
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 20,
    },
    input: {
      fontFamily: sansSerifFontFamily,
      fontSize: '14px',
    },
  },
} as ThemeOptions);

export default theme;
