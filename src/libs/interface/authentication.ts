/* eslint-disable no-debugger */
import jwtDecode from 'jwt-decode';

import { LevelString, log } from 'helpers/logger';

import { Credentials, HttpRequest, NetworkRequest, RequestError, TokenData } from './data';
import { authReq, noAuthReq } from './networking';
import { encodeQueryParams, returnAuthError, returnTokenIfValid } from './networking-internal';
// import jwt_decode from 'jwt-decode';

// Useful Documentation
// ====================
// OpenID Connect (built on top of OAuth 2)
// Core documentation, incl. ID token: https://openid.net/specs/openid-connect-core-1_0.html
// --------------------
// OAuth2
// Full documentation, including refresh token: https://oauth.net/2/
// --------------------
// JSON Web Token
// Description, including standard/optional fields: https://en.wikipedia.org/wiki/JSON_Web_Token
// ====================

// Generic Functionality

export const defaultCredentials: Record<string, Credentials> = {
  rmq: { password: 'chpidapassword', username: 'chpida_api' },
  rmqTest: { password: 'guest', username: 'guest' },
  service: { password: 'chpidapassword', username: 'api' },
  user: { password: 'testpassword', username: 'test' },
};

// TODO: discuss possible checks with team.
// sanity check for length, etc, remove equality check for default credentials
function validCredentials(credentials: Credentials): boolean {
  return (
    credentials.username.length < 100 &&
    credentials.username.length > 1 &&
    credentials.password.length < 100 &&
    credentials.password.length > 1
  );
}

// Generic Functionality END

export function login(credentials: Credentials): Promise<TokenData | RequestError> {
  const params: Record<string, string> = {
    client_id: 'chpida_api', // base on parameter?
    grant_type: 'password',
    password: credentials.password,
    scope: 'openid',
    username: credentials.username,
  };

  const request: NetworkRequest = {
    body: encodeQueryParams(params),
    method: HttpRequest.POST,
    url: '/login',
  };

  if (!validCredentials(credentials)) return Promise.reject(RequestError.InvalidCredentials);
  return noAuthReq(request)
    .then(returnTokenIfValid, returnAuthError)
    .then(
      result => {
        log(LevelString.INFO, 'login', result);
        return result;
      },
      error => {
        log(LevelString.ERROR, 'login error', error);
        return error;
      },
    );
}

export function logout(credentials: TokenData): Promise<boolean> {
  const request: NetworkRequest = {
    body: encodeQueryParams({
      id_token_hint: credentials.id_token || '',
    }),
    method: HttpRequest.POST,
    url: '/logout',
  };

  log(LevelString.INFO, 'decoded token', jwtDecode(credentials.access_token));

  return authReq(request, credentials).then(
    () => true,
    () => false,
  );
}
