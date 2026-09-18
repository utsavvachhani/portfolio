// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'dark'

    background: {
        default: '#0e0d0d',
        paper: '#ffffff',
    },

    primary: {
      main: '#f8f8f8ff',
    },

    secondary: {
      main: '#606574',
    },

    divider : {
      main: '#E0E0E0',
    },
    text: {
      primary: '#f3eeeeff',
      secondary: '#131313ff',
      disabled: '#9EA99D',
      title: '#000000',
    },


    custom: {
      colors: {
        avatar: '#000000',
        avatarBackground: '#f9f9f9',
      },
      button: {
        background: '#05325B',
        text: '#ffffff',
        border: '#1e1d1e',
        hover: '#a5b6e1',
        hoverText: '#000000',
        hoverTextSecondary: '#e7e7e7ff',
        hoverShadow: '#c94444ff',
        disableBaground: '#999999',
        disabledText: '#666666',
        disabledBorder: '#999999',
      },
    },
  },

  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    navbar: 'Poppins',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    hoverText : {
      fontfamily: 'Georgia, serif',
      fontSize: '1.1rem',
    }
  },
});

export default theme;