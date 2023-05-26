import { defaultCredentials } from './authentication';
import { Credentials } from './data';

export function authData(): Credentials {
  return defaultCredentials.user;
}

export function userData(): null {
  return null;
}

export function appData(): null {
  return null;
}

export function connectionStatus() {
  return {
    connected: false,
    connectionString: 'DummyConnection',
  };
}
