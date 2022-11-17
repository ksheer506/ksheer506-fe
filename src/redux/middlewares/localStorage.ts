/* eslint-disable consistent-return */
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { RootState } from '..';
import { CaseHandler } from '.';
import { isKeyOf } from '../../utilities/typeGuards/isKeyOf';

function saveUserID(
  storeAPI: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
  next: Dispatch<AnyAction>,
  action: AnyAction
) {
  next(action);

  const { ID, NAME } = storeAPI.getState().user;
  localStorage.setItem('currentUser', JSON.stringify({ID, NAME}));
}

const localStorageHandler: CaseHandler = {
  'user/initializeUserInfos': (storeAPI, next, action) => saveUserID(storeAPI, next, action),
  'user/logOutUser': () => {
    localStorage.removeItem('currentUser');
  },
};

export const localStorageMW: Middleware<undefined, RootState> =
  (storeAPI) => (next) => (action) => {
    const { type } = action;

    if (isKeyOf(type, localStorageHandler)) {
      localStorageHandler[type](storeAPI, next, action);
    }

    return next(action);
  };
