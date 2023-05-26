import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import i18n from 'config/i18n';
import { ConnectionProvider } from 'context/ConnectionContext';
import AppRoutes from 'routes';
import { store } from 'store/store';
import theme from 'theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ConnectionProvider>
            <SnackbarProvider maxSnack={3}>
              <Router>
                <AppRoutes />
              </Router>
            </SnackbarProvider>
          </ConnectionProvider>
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
