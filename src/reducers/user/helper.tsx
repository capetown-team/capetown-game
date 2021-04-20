export const getNewUser = (response, userSign) => {
  const avatar = '';
  if (userSign.avatar !== undefined)
  {
    avatar = userSign.avatar;
  }
  return {
    id: response.data.id,
    login: userSign.user.login,
    avatar: avatar,
    first_name: userSign.user.first_name,
    second_name: userSign.user.second_name,
    display_name: "",
    email: userSign.user.email,
    phone: userSign.user.phone,
    password: userSign.user.password,
  };
};
