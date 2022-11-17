import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { UserInfos } from '../../types';

import { RootState } from '../store';

interface UserInfosStore extends UserInfos {
  accessToken: string;
}

export const initialUserInfos: UserInfosStore = {
  id: '',
  name: '',
  accessToken: '',
};

const usesrSlice = createSlice({
  name: 'user',
  initialState: initialUserInfos,
  reducers: {
    getAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    initializeUserInfos: (state, { payload }: PayloadAction<UserInfos>) => {
      const { id, name } = payload;

      state.id = id;
      state.name = name;
    },
  },
});

export const selectUserInfos = (state: RootState) => state.user;

export const { getAccessToken, initializeUserInfos } = usesrSlice.actions;
export const userReducer: Reducer<UserInfosStore> = usesrSlice.reducer;
