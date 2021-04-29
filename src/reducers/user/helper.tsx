export const getNewUser = (response, userSign) => {
  let avatar = '';
  if (userSign.user.avatar !== undefined) {
    avatar = userSign.user.avatar;
  }

  return {
    id: response.data.id,
    login: userSign.user.login,
    avatar,
    first_name: userSign.user.first_name,
    second_name: userSign.user.second_name,
    display_name: '',
    email: userSign.user.email,
    phone: userSign.user.phone,
    password: userSign.user.password
  };
};
