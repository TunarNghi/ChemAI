"use client";

import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark' = 'dark') => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#0284c7', // Cyan / Sky blue
        dark: '#0369a1',
        light: '#38bdf8',
      },
      secondary: {
        main: '#a855f7', // Purple
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#090d16',
        paper: mode === 'light' ? '#ffffff' : '#0f172a',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#f8fafc',
        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      },
    },
    typography: {
      fontFamily: ['Inter', 'var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
      h1: { fontWeight: 800, letterSpacing: '-0.025em' },
      h2: { fontWeight: 800, letterSpacing: '-0.025em' },
      h3: { fontWeight: 800, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 700, letterSpacing: '-0.015em' },
      h6: { fontWeight: 600, letterSpacing: '-0.01em' },
      button: { textTransform: 'none', fontWeight: 600 },
    },
  });
};

export const theme = getAppTheme('dark');

