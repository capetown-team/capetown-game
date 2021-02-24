import { combineReducers } from 'redux';
import { authReducer } from '@/reducer/auth/reducer';
import { formReducer } from '@/reducer/forum/reducer';
import { leadersReducer } from '@/reducer/leaders/reducer';
import { signinReducer } from '@/reducer/signin/reducer';
import { signupReducer } from '@/reducer/signup/reducer';
import { userReducer } from '@/reducer/user/reducer';

export default combineReducers({
  auth: authReducer,
  forum: formReducer,
  loader: leadersReducer,
  signin: signinReducer,
  singup: signupReducer,
  user: userReducer
});
