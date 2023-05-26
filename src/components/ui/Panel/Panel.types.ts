import { MenuItems } from '@CanineLizard/react-component-lib';
import React from 'react';

export interface PanelIndicator {
  indicatorFill: string;
  indicatorDisabled: boolean;
  indicatorDisplay: boolean;
}

export interface IPanelProps {
  actionBtn?: React.ReactNode;
  children: React.ReactNode;
  indicator: PanelIndicator;
  menuItems?: MenuItems;
  handleClose?: () => void;
  title: string;
}

export const defaultIndicatorProps: PanelIndicator = {
  indicatorDisabled: false,
  indicatorDisplay: false,
  indicatorFill: 'orange',
};
