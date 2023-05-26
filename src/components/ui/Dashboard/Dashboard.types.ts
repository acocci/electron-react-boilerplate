import { ResponsiveProps } from 'react-grid-layout';

import { ComponentArray } from '../ComponentById/ComponentById.types';

// cols & breakpoints keys
export enum Keys {
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
}
export const RequiredLayout = Keys.LG;

// cols & breakpoints key value pairs
export type CBPairs = { [P: string]: number };
export const BREAKPOINTS_VALUES: CBPairs = {
  [Keys.LG]: 1200,
  [Keys.MD]: 996,
  [Keys.SM]: 768,
};
export const COLS_VALUES: CBPairs = {
  [Keys.LG]: 4,
  [Keys.MD]: 3,
  [Keys.SM]: 2,
};
export const defaultGridProps: ResponsiveProps = {
  breakpoints: BREAKPOINTS_VALUES,
  cols: COLS_VALUES,
  rowHeight: 200,
};

export enum DashboardType {
  EVA = 'Eva',
  HOME = 'Home',
  EXERCISE = 'Exercise',
  CLINICAL = 'Clinical',
  SETTINGS = 'Settings',
}

export interface IResponsiveGridLayout extends ResponsiveProps {
  components: ComponentArray;
  disableSave?: boolean;
  editable?: boolean;
  roles?: Array<string>;
  type: DashboardType;
}

export interface IControls {
  disableSave?: boolean;
  onEdit: () => void;
  onReset: () => void;
  onSave: () => void;
}

// TODO Use real roles
export enum Roles {
  ADMIN = 'ADMIN',
  CM = 'CM',
  CMO = 'CMO',
  DEFAULT = 'DEFAULT',
  SERVICE = 'SERVICE',
}

export const allRoles = Object.values(Roles);
