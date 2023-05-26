import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TokenData } from 'libs/interface/data';

interface LoginState {
  firstName: string;
  lastName: string;
  roles: Array<string>;
  token: TokenData;
  refreshToken: string;
}

const initialState: LoginState = {
  firstName: '',
  lastName: '',
  refreshToken: '',
  roles: [],
  token: {
    access_token: '',
    expires_in: 0,
    id_token: '',
    'not-before-policy': 0, // 0,
    refresh_expires_in: 0,
    refresh_token: '',
    scope: '', // "email profile",
    session_state: '',
    token_type: 'Bearer',
  },
};

const loginSlice = createSlice({
  initialState,
  name: 'Login',
  reducers: {
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setToken(state, action: PayloadAction<TokenData>) {
      state.token = action.payload;
    },

    setUserInfo(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.roles = action.payload.roles;
    },
  },
});

export const { setToken, setRefreshToken, setUserInfo } = loginSlice.actions;
export default loginSlice.reducer;
