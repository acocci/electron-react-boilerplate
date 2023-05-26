export enum CMD {
  Deselect = 'DisconnectDevice',
  Select = 'SelectDevice',
}
export type ConnectionType = CMD.Deselect | CMD.Select | null;

export interface IConnectButton {
  address: string;
  agent?: string;
  name?: string;
  variant?: 'text' | 'outlined' | 'contained';
}
