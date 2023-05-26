import i18next from 'i18next';

import { ICO, Sx } from 'types/generic.types';

export interface HeaderProps {
  auth?: boolean;
  links?: HeaderMenuItems;
  logo?: React.ReactNode;
  messages?: boolean;
  switchLanguage?: boolean;
  sx?: Sx;
  title: string;
  translate?: boolean;
}

export const LinkOptions = {
  about: i18next.t('navigation.links.about'),
  home: i18next.t('navigation.links.home'),
};

export interface IHeaderMenuItem {
  disabled?: boolean;
  Icon?: ICO;
  iconOnly?: boolean;
  name: string;
  sx?: Sx;
  value: string;
}

export type HeaderMenuItems = Array<IHeaderMenuItem>;

export const defaultHeaderMenuItems = [
  // {
  //   Icon: HomeIcon,
  //   name: 'navigation.links.home',
  //   value: '/',
  // },
  // {
  //   name: 'navigation.links.devices',
  //   value: '/devices',
  // },
  {
    name: 'navigation.links.activeDevices',
    value: '/active-devices',
  },
  // {
  //   name: 'navigation.links.catalog',
  //   value: '/catalog',
  // },
  // {
  //   name: 'navigation.links.tokenTest',
  //   value: '/token-test',
  // },
];
