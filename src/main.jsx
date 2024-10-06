import ReactDOM from 'react-dom/client';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v3.x or v4.x, please import the v3 adapter
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import App from './App';
import './main.css';
import RootLayout from './pages/layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RootLayout>
          <App />
      </RootLayout>
    </LocalizationProvider>
    </React.StrictMode>,
);
