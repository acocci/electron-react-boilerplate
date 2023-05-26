import { IAutoComplete, ITableProps } from '@CanineLizard/react-component-lib';

import { IResponsiveGridLayout } from 'components/ui/Dashboard/Dashboard.types';

export enum DisplayOptions {
  DASHBOARD = 'dashboard',
  LIST = 'list',
}

type Display = DisplayOptions.DASHBOARD | DisplayOptions.LIST;
export const defaultDisplayType = DisplayOptions.DASHBOARD;

export interface IToggleView {
  autoCompleteProps?: IAutoComplete;
  dashboardProps: IResponsiveGridLayout;
  displayType?: Display;
  onFilter?: (regEx: RegExp) => void;
  tableProps: ITableProps;
}
