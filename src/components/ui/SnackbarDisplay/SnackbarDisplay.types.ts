import { AlertColor, SnackbarContentProps, SnackbarOrigin } from '@mui/material';

import { ReactNode } from 'types/generic.types';

export interface IProviderProps {
  children?: ReactNode;
}

export enum Severity {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

export interface ISnackbar {
  action?: SnackbarContentProps['action'];
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  hideCloseBtn?: boolean;
  message: string;
  severity?: AlertColor;
}
interface ISnackbarContext {
  hideSnackbar: () => void;
  showSnackbar: (sb: ISnackbar) => void;
  snackbar: ISnackbar | null;
}

export const DEFAULT_CONTEXT: ISnackbarContext = {
  hideSnackbar: () => {},
  showSnackbar: () => {},
  snackbar: null,
};

export const snackBarDefaults: ISnackbar = {
  anchorOrigin: {
    horizontal: 'left',
    vertical: 'bottom',
  },
  autoHideDuration: 3000,
  hideCloseBtn: false,
  message: '',
  severity: Severity.success as AlertColor,
};
