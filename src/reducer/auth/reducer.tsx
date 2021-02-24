import { AUTH, AUTHORIZE_CHECK, PENDING_AUTHORIZE } from './types';

interface IUserInfoStateType {
  login: string;
  avatar: string;
  checkAuthorize: boolean;
  isAuthorized: boolean;
}

type ActionType = {
  type: string;
  payload: IUserInfoStateType;
};

const initialState = {
  isAuth: false,
  login: '',
  avatar: '',
  checkAuthorize: false
};

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case AUTH: {
      return { ...state, ...action.payload, isAuth: true };
    }
    case AUTHORIZE_CHECK:
      return { ...state, checkingAuthorize: false };
    case PENDING_AUTHORIZE:
      return { ...state, checkingAuthorize: true };
    // no default
  }

  return state;
};
