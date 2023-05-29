import {
  defaultDisplayType,
  DisplayOptions,
} from '../../features/ToggleView/ToggleView.types';

export const isDefaultDisplayType = (type: string) =>
  type === defaultDisplayType;
export const isDashboard = (type: string) => type === DisplayOptions.DASHBOARD;
export const isList = (type: string) => type === DisplayOptions.LIST;
