import { SvgIconComponent } from '@mui/icons-material';
import { SvgIconProps, SxProps } from '@mui/material';

export type GenericArray = Array<string | number | GenericKVPair>;
export type GenericKVPair = { [s: string]: string | number | unknown } | ArrayLike<unknown>;
export type GenericRecord = Record<string | number, unknown>;
export type GenericStrNumRecord = Record<string, number>;
export type GenericRecords = Array<GenericRecord>;
export type ICO = SvgIconComponent | React.ComponentType<SvgIconProps>;
export type ReactEvent = React.SyntheticEvent | React.ChangeEvent<HTMLInputElement>;
export type ReactNode = React.ReactNode;
export type RFC = React.FunctionComponent<GenericRecord>;
export type StrNum = string | number;
export type StrNumNode = StrNum | ReactNode;
export type Sx = SxProps;

export interface ILabelValuePair {
  label: string;
  value: string;
}
export type LabelValuePairs = Array<ILabelValuePair>;
export type LabelValues = ILabelValuePair | LabelValuePairs | null;

export interface INameValuePair {
  name: string;
  value: string;
}
export type NameValuePairs = Array<INameValuePair>;

export interface INVtypes {
  icon?: ICO;
  name: string;
  value?: string;
}
export type IconNameValues = Array<INVtypes>;
