import { ThemeProvider } from '@mui/material/styles';
import type { Preview } from '@storybook/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import i18n from '../src/config/i18n';
import { ConnectionProvider } from '../src/context/ConnectionContext';
import { store } from '../src/store/store';
import theme from '../src/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ConnectionProvider>
                <SnackbarProvider maxSnack={3}>
                  <Story />
                </SnackbarProvider>
              </ConnectionProvider>
            </I18nextProvider>
          </Provider>
        </ThemeProvider>
      </HashRouter>
    ),
  ],
};

export default preview;
