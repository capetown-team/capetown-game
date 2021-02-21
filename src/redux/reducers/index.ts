import { combineReducers } from 'redux';

import { userReducer } from './user';

// В этом файле будем объединять все редьюсеры в один
export default combineReducers({
  user: userReducer
});
