import { ICO, Sx } from 'types/generic.types';

export default interface IAvatar {
  alt?: string;
  color?: string;
  Icon?: ICO;
  iconColor?: string;
  initials?: boolean;
  src?: string;
  sx?: Sx;
  tooltip?: boolean;
}
