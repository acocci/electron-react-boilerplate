export enum RequestError { // TODO: Look for better name
  TokenNeedsRefresh = 'TokenNeedsRefresh',
  TokenRefreshError = 'TokenRefreshError',
  InvalidCredentials = 'InvalidCredentials',
  InvalidToken = 'InvalidToken',
  MalformedToken = 'MalformedToken',
  NetworkError = 'NetworkError',
  RefreshTokenExpired = 'RefreshTokenExpired',
  ServerError = 'ServerError',
  AuthInitializationFailed = 'AuthInitializationFailed',
  Unknown = 'Unknown', // should we have a catch-all?
}

export interface Credentials {
  readonly username: string;
  readonly password: string;
}

export interface TokenData {
  access_token: string;
  id_token?: string;
  expires_in: number;
  'not-before-policy': number; // 0,
  refresh_expires_in: number;
  refresh_token: string;
  scope: string; // "email profile",
  session_state: string;
  token_type: 'Bearer';
}

export interface UserData {
  readonly firstName: string;
  readonly lastName: string;
  readonly roles: string[];
  readonly profilePicture: string;
}

// export interface AppData {}

export interface SSLOptions {
  cert: Buffer; // client cert, ex: fs.readFileSync('../etc/client/cert.pem')
  key: Buffer; // client key
  passphrase: 'MySecretPassword'; // passphrase for key
  ca: Buffer[]; // array of trusted CA certs
}

export const enum HttpRequest {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
}

export interface LoginRequest {
  grant_type: string;
  username: string;
  password: string;
  client_id: string;
}
export interface NetworkRequest {
  url: string;
  method: HttpRequest;
  body?: LoginRequest | string;
}
