// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import {StylesProvider} from '@mui/styles'
import theme from './theme.js';
import './index.css';

createRoot(document.getElementById('root')).render(
  <>
    <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <StylesThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </StylesThemeProvider>
    </MuiThemeProvider>
    </StylesProvider>
  </>
);