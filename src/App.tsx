import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, IconButton } from '@mui/material';
import Routing from './routes/Routing';
import { useRef } from 'react';
import { SnackbarProvider } from 'notistack';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { IconX } from '@tabler/icons-react';

function App() {
  const snackbar: any = useRef()
  return (
    <BrowserRouter>
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

          <CssBaseline />
          <Routing />
        </SnackbarProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
