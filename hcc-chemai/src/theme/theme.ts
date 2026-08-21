"use client";

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0284c7', // Cyan / Sky blue
      dark: '#0369a1',
      light: '#38bdf8',
    },
    secondary: {
      main: '#a855f7', // Purple
    },
    background: {
      default: '#090d16',
      paper: '#0f172a',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
  },
});
