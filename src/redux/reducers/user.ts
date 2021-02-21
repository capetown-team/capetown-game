const initialState = {
  user: {
    id: 0,
    login: '',
    email: '',
    first_name: '',
    second_name: '',
    display_name: null,
    avatar: null,
    phone: ''
  },
  isSignIn: false,
  status: 'init'
};

export const userReducer = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        status: 'pending',
        isSignIn: true
      };
    case 'SIGNUP':
      return {
        ...state,
        status: 'pending',
        isSignIn: true
      };
    case 'LOGOUT':
      return {
        ...state,
        status: 'pending',
        isSignIn: false
      };
    default:
      return state;
  }
};
