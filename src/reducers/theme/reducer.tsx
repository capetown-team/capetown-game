import { ThemeAction } from './actions';
import { THEME_LIST_SUCCESS, THEME_FAILURE, THEME_SUCCESS } from './constants';

export const initialState = {
  selectedTheme: undefined,
  theme: {},
  themesList: []
};

export const themeReducer = (state = initialState, action: ThemeAction) => {
  switch (action.type) {
    case THEME_LIST_SUCCESS:
      return {
        ...state,
        themesList: action.payload
      };
    case THEME_SUCCESS: {
      return {
        ...state,
        selectedTheme: String(action.payload.id),
        theme: action.payload.data
      };
    }
    case THEME_FAILURE:
      return { ...state };
    default:
      return state;
  }
};
