import { baselightTheme } from "@/themes/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from 'notistack'
import CssBaseline from "@mui/material/CssBaseline";
import LoadingWrapped from "@/components/loadings/LoadingWrapped";
import { Provider as ReduxProvider } from 'react-redux'
import { IconButton } from '@mui/material'

import store from '../store'
import { useRef } from "react";
import { IconX } from "@tabler/icons-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snackbar: any = useRef()
  return (
    
      <ReduxProvider store={store}>
        <SnackbarProvider
              ref={snackbar}
              autoHideDuration={5000}
              action={(key) => (
                <IconButton
                  aria-label='close'
                  onClick={() => snackbar.current.closeSnackbar(key)}
                  sx={{
                    color: '#FFF'
                  }}
                >
                  <IconX />
                </IconButton>
              )}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              preventDuplicate
            >
          <LoadingWrapped>
            <ThemeProvider theme={baselightTheme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {children}
            </ThemeProvider>
        </LoadingWrapped>
        </SnackbarProvider>
      </ReduxProvider >
  );
}
