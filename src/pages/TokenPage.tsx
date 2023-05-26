import { Button, Container, Stack } from '@mui/material';
import { useContext } from 'react';

import { ConnectButton } from 'components/ui';
import { ConnectionContext } from 'context/ConnectionContext';
import { LevelString, log } from 'helpers/logger';
import { AgentCMD } from 'libs/interface/api/connection';
import { handleAvailableDevices } from 'libs/interface/api/message-handlers';
import {
  defaultCredentials,
  login,
  logout,
} from 'libs/interface/authentication';
import { TokenData } from 'libs/interface/data';
import { refreshToken } from 'libs/interface/networking-internal';
import TitleTypography from 'libs/ui/components/TitleTypography';

import { api } from '../libs/interface/networking';

const TokenPage = () => {
  let tokenData: TokenData | null = null;
  let expires = 0;

  // need to add {} to connection as the context gives a nested connection
  // grabs the connection from the connection context provider
  const { connection } = useContext(ConnectionContext);

  /* TODO: attach username and password to login test function */
  // .then(
  //   fulfilled => {
  //     if ('token' in (fulfilled as UserTokens)
  //       expires = fulfilled.tokenParsed.exp
  //   }
  // );

  const btnLogin = () => {
    login(defaultCredentials.service).then((data) => {
      if (!(typeof data === 'string')) {
        tokenData = data;
        expires = tokenData.expires_in;
      }
    });
  };

  const btnRefresh = () => {
    if (tokenData != null)
      refreshToken(api, tokenData).then((data) => {
        if (!(typeof data === 'string')) tokenData = data;
      });
  };

  const btnLogout = () => {
    if (tokenData != null)
      logout(tokenData).then((success) =>
        log(LevelString.INFO, 'Logout successful', success)
      );
  };

  // TODO: add device to inclusion list.
  const btnApiCmd = () => {
    // sends a command to get back a list of devices. needs agent ID, command, inclusion list scan type
    // and a result handler callback
    connection.sendCMD(
      AgentCMD.ListAvailableDevices,
      'e79aa753-4335-4750-9134-024ab08b05e0',
      {
        inclusion_list: [],
        scan_type: 'device_name',
      },
      handleAvailableDevices
    );
  };

  const connectcmd = () => {
    connection.sendCMD(
      AgentCMD.SelectDevice,
      'e79aa753-4335-4750-9134-024ab08b05e0',
      {
        deviceid: 'EE:32:91:5E:C2:D4',
        characteristics: ['00002A37-0000-1000-8000-00805F9B34FB'],
      }
      // logMessageHandler,
    );
  };

  const disconnectcmd = () => {
    connection.sendCMD(
      AgentCMD.DisconnectDevice,
      'e79aa753-4335-4750-9134-024ab08b05e0',
      {
        deviceid: 'EE:32:91:5E:C2:D4',
      }
    );
  };
  // const newPostValidationSchema = Yup.object().shape({
  //   username: Yup.string().required('Username required'),
  //   password: Yup.string().required('Password required'),
  // });

  // const methods = useForm<Credentials>({
  //   defaultValues,
  //   resolver: yupResolver(newPostValidationSchema),
  // });
  // const { handleSubmit, reset, control } = methods;

  return (
    <>
      <TitleTypography title={'Token Test Page'} />
      <Container maxWidth="xs">
        {' '}
        <Stack
          sx={{ pt: 0 }}
          direction="column"
          spacing={1}
          justifyContent="center"
        >
          {/* <FormTextField name="username" label={'Username'} control={control} />
          <FormTextField name="password" label={'Password'} control={control} /> */}
          <Button onClick={btnLogin} variant={'contained'}>
            {'Login'}
          </Button>
          <Button onClick={btnRefresh} variant={'contained'}>
            {'Refresh'}
          </Button>
          <Button onClick={btnLogout} variant={'outlined'}>
            {'Logout'}
          </Button>
          <Button onClick={btnApiCmd} variant={'outlined'}>
            {'List of devices'}
          </Button>
          <Button onClick={connectcmd} variant={'outlined'}>
            {'Connect to device'}
          </Button>
          <Button onClick={disconnectcmd} variant={'outlined'}>
            {'disconnect to device'}
          </Button>
          <ConnectButton address={'4CC9AB7E-5C0C-F254-1798-3B05E1728672'} />
        </Stack>
      </Container>
      <Container sx={{ py: 4 }} maxWidth="md">
        {/* TODO: add bindings for keycloak instance to display change in values */}
        <Stack justifyContent="center">
          <p>Expires in {expires} seconds</p>
        </Stack>
        {/* <PostList posts={posts} onDeletePost={deletePost} onUpdatePost={updatePost} /> */}
      </Container>
    </>
  );
};

export default TokenPage;
