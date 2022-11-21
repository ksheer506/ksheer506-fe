import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { UserInfos } from '../../types';

import { RootState } from '../store';

interface UserInfosStore extends UserInfos {
  accessToken: string;
}

export const initialUserInfos: UserInfosStore = {
  ID: '',
  NAME: '',
  accessToken: '',
};

const usesrSlice = createSlice({
  name: 'user',
  initialState: initialUserInfos,
  reducers: {
    initializeUserInfos: (state, { payload }: PayloadAction<UserInfosStore>) => {
      const { accessToken, ID, NAME } = payload;

      state.accessToken = accessToken;
      state.ID = ID;
      state.NAME = NAME;
    },
    logOutUser: () => {
      return initialUserInfos;
    },
  },
});

export const selectUserInfos = (state: RootState) => state.user;

export const { initializeUserInfos, logOutUser } = usesrSlice.actions;
export const userReducer: Reducer<UserInfosStore> = usesrSlice.reducer;
