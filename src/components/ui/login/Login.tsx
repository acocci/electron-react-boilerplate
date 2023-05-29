import { Box, Button, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

import { LevelString, log } from '../../../helpers/logger';
import { login, logout } from '../../../libs/interface/authentication';
import { Credentials, TokenData } from '../../../libs/interface/data';
import { api } from '../../../libs/interface/networking';
import { refreshToken } from '../../../libs/interface/networking-internal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { setToken, setUserInfo } from './Login-slice';
// added changes
const Login = () => {
  const { firstName, lastName, roles } = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  let tokenData: TokenData | null = null;
  const [userCredentials, setUserCredentials] = useState<Credentials>({
    password: '',
    username: '',
  });

  function loginUser() {
    login(userCredentials).then((data) => {
      if (!(typeof data === 'string')) {
        tokenData = data;
        const decoded: {
          given_name: string;
          family_name: string;
          realm_access: { roles: Array<string> };
        } = jwtDecode(tokenData.access_token);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { given_name, family_name, realm_access } = decoded;
        log(LevelString.INFO, 'decoded', decoded);

        dispatch(
          setUserInfo({
            firstName: given_name,
            lastName: family_name,
            roles: realm_access.roles,
          })
        );

        dispatch(setToken(tokenData));
      }
    });
  }

  const btnLogout = () => {
    if (token != null) {
      logout(token).then((success) =>
        log(LevelString.INFO, 'Logout successful', success)
      );
    }
  };

  const btnRefresh = () => {
    if (token != null)
      refreshToken(api, token).then((data) => {
        if (!(typeof data === 'string')) dispatch(setToken(data));
      });
  };

  return (
    <>
      <form>
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <TextField
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                username: e.target.value,
              })
            }
            required
            id="outlined-required"
            label="Username"
            size="small"
          />
          <TextField
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            size="small"
          />

          <Button onClick={loginUser} variant="contained" size="medium">
            Login
          </Button>
        </Box>
      </form>
      {firstName && lastName && roles && (
        <>
          <Box
            sx={{
              '& > :not(style)': { m: 1 },
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Button onClick={btnLogout} variant="contained">
              Logout
            </Button>
            <Button onClick={btnRefresh} variant="contained">
              Refresh
            </Button>
          </Box>
          <h1>
            {firstName} {lastName} {roles}
          </h1>
        </>
      )}
    </>
  );
};

export default Login;
