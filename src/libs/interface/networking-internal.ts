import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';

import { LevelString, log } from 'helpers/logger';

import { HttpRequest, NetworkRequest, RequestError, TokenData } from './data';

// WARNING: NOT INTENDED FOR USE BY EXTERNAL APPLICATIONS

export function returnTokenIfValid(response: AxiosResponse): TokenData | RequestError {
  log(LevelString.INFO, 'token response:', response);
  if (
    'access_token' in response &&
    'expires_in' in response &&
    'not-before-policy' in response &&
    'refresh_expires_in' in response &&
    'refresh_token' in response &&
    'scope' in response &&
    'session_state' in response &&
    'token_type' in response
  ) {
    log(LevelString.INFO, 'Valid token');
    return response as TokenData;
  }
  log(LevelString.WARN, 'Invalid token', response);
  return RequestError.MalformedToken;
}

export function returnAuthError(error: AxiosError) {
  // if/else logic taken from Axios docs https://axios-http.com/docs/handling_errors
  if (error.response) {
    // server responded with status code
    // log('Error requesting service authentication: ' + error.response.data)
    if (error.response.status === 401) {
      return RequestError.InvalidCredentials;
    }
    if (error.response.status === 500) {
      return RequestError.ServerError;
    }
    // what other status codes might be returned?
    return RequestError.Unknown;
  }
  if (error.request) {
    // no response was received
    log(LevelString.INFO, 'No response received');
    return RequestError.NetworkError;
  }
  // something in the request triggered the error
  return RequestError.Unknown;
}

export function encodeQueryParams(params: Record<string, string>): string {
  const encoded: string[] = [];
  Object.keys(params).forEach(property => {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    encoded.push(`${encodedKey}=${encodedValue}`);
  });

  return encoded.join('&');
}

// TODO: limit request body to known data structures?
// TODO: add auth data to request. through headers or some other method?
// TODO: add body to request
export function getRequest(api: AxiosInstance) {
  return (request: NetworkRequest, authentication?: TokenData) => {
    if (authentication != null) {
      log(LevelString.INFO, 'Auth', { authentication, request });
      const config: Record<string, unknown> = {
        headers: { Authorization: `Bearer ${authentication.access_token}` },
      };

      // TODO?: remove/replace toString() by changing handling of request body, type
      if (request.body != null)
        return api[request.method](request.url, request.body.toString(), config);
      return api[request.method](request.url, '', config);
    }

    // NOTE: NoAuth is intended for use by login functionality. will not function for most endpoints
    // TODO: limit request body to known data structures?
    log(LevelString.INFO, 'NoAuth', request);
    if (request.body) return api[request.method](request.url, request.body.toString());
    return api[request.method](request.url);
  };
} // Return a function that executes a network request with CHP-IDA headers and current auth data

export function refreshToken(
  api: AxiosInstance,
  credentials: TokenData,
): Promise<TokenData | RequestError> {
  const params: Record<string, string> = {
    client_id: 'chpida_api', // base on parameter?
    grant_type: 'refresh_token',
    refresh_token: credentials.refresh_token,
  };

  const request: NetworkRequest = {
    body: encodeQueryParams(params),
    method: HttpRequest.POST,
    url: '/login',
  };

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return retryOnFailure(api, request, 3, getRequest, credentials, false)
    .then(returnTokenIfValid, returnAuthError)
    .then(
      result => {
        log(LevelString.INFO, 'refresh', result);
        return result;
      },
      error => {
        log(LevelString.ERROR, 'refresh error', error);
        return error;
      },
    );
}

// NOTE: only returns final failure upon multiple failed attempts
export function retryOnFailure(
  api: AxiosInstance,
  request: NetworkRequest,
  attempts: number,
  func: (api: AxiosInstance) => (req: NetworkRequest, creds?: TokenData) => Promise<AxiosResponse>,
  additionalArg: TokenData | null = null,
  refreshtoken = true,
  logFailures = false,
  onSuccess?: (response: AxiosResponse) => void,
  onFailure?: (error: AxiosError) => void,
  _finally?: () => void,
): Promise<AxiosResponse> {
  const req = additionalArg != null ? func(api)(request, additionalArg) : func(api)(request);

  const shouldRefresh = () => {
    if (additionalArg == null || !refreshtoken) return false;

    const decoded = jwt_decode(additionalArg.access_token);
    log(LevelString.INFO, 'decoded', decoded);
    return true;
    // let currentTime = new Date();
    // let expires = new Date(authentication.issuedAt.getTime() + 1000 * authentication.minutesValid);

    // return currentTime < expires;
  };

  return req
    .then((response: AxiosResponse) => {
      log(LevelString.INFO, 'Response', response);
      if (onSuccess != null) onSuccess(response);
      if (_finally != null) _finally();

      return response;
    })
    .catch((error: AxiosError) => {
      // if (logFailures)
      log(LevelString.ERROR, 'AxiosError', error);
      if (attempts === 1) {
        log(LevelString.ERROR, 'final attempt failed');
        // currently, only executing onFailure for the last failure
        if (onFailure != null) onFailure(error);
        if (_finally != null) _finally();

        return Promise.reject(error);
      }
      if (additionalArg != null && shouldRefresh()) {
        log(LevelString.INFO, 'Refreshing token');
        return refreshToken(api, additionalArg).then(
          // token refresh should not count as a failure
          newTokens => {
            if (Object.values(RequestError).includes(newTokens as RequestError)) {
              return retryOnFailure(
                api,
                request,
                attempts - 1,
                func,
                additionalArg,
                refreshtoken,
                logFailures,
                onSuccess,
                onFailure,
                _finally,
              );
            }
            return retryOnFailure(
              api,
              request,
              attempts,
              func,
              newTokens as TokenData,
              refreshtoken,
              logFailures,
              onSuccess,
              onFailure,
              _finally,
            );
          },
          refreshError => {
            log(LevelString.ERROR, 'Error automatically refreshing token in retry', refreshError);
            return Promise.reject(RequestError.Unknown);
          },
        );
      }
      // recursively call function, decrementing attempts
      return retryOnFailure(
        api,
        request,
        attempts - 1,
        func,
        additionalArg,
        refreshtoken,
        logFailures,
        onSuccess,
        onFailure,
        _finally,
      );
    });
} // - Automatically retry request up to n times
