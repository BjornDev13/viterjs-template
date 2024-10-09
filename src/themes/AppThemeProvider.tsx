import React from 'react';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { red } from "@mui/material/colors";

function AppThemeProvider({ children }) {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: "#556cd6",
        },
        secondary: {
          main: "#19857b",
        },
        error: {
          main: red.A400,
        },
        background: {
          default: '#FCFBFA',
          paper: '#FCFCFC',
        },
        text: {
          primary: '#000000',
          secondary: '#999999',
          disabled: '#C3C1BD',
        },

        grey: {
          50: 'hsl(0, 5%, 95%)',
          100: 'hsl(0, 0%, 90%)',
          200: 'hsl(0, 0%, 80%)',
          300: 'hsl(0, 0%, 70%)',
          400: 'hsl(0, 0%, 60%)',
          500: 'hsl(0, 0%, 50%)',
          600: 'hsl(0, 0%, 40%)',
          700: 'hsl(0, 0%, 30%)',
          800: 'hsl(0, 0%, 20%)',
          900: 'hsl(0, 0%, 10%)',
        },
      },

      typography: {
        fontFamily: 'Dosis, sans-serif',

        h1: {
          fontSize: '26px',
          fontWeight: '600',
          // lineHeight: '33px',
        },
        h2: {
          fontSize: '22px',
          fontWeight: '600',
          // lineHeight: '28px',
        },
        h3: {
          fontSize: '20px',
          fontWeight: '600',
          // lineHeight: '25px',
        },
        h4: {
          fontSize: '18px',
          fontWeight: '600',
          // lineHeight: '23px',
        },
        h5: {
          fontSize: '16px',
          fontWeight: '500',
          // lineHeight: '20px',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              // ---CSS BODY--- \\
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              cursor: 'pointer',
              textDecoration: 'none',
              lineHeight: '16px',
              transition: 'all 0.1s ease-in-out',
              '&:hover': {
                opacity: 0.8,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              aspectRatio: '1/1',
            },
          },
        },
      },
    }),
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
