export type UserType = {
  id: number;
  login: string;
  avatar: string | null;
  first_name: string;
  second_name: string;
  display_name: string | null;
  email: string;
  phone: string;
};

export type UserState = {
  isAuth: boolean;
  pending: boolean;
  load: boolean;
  error?: boolean;
  user: UserType | null;
};

export type SignInType = {
  login: string;
  password: string;
};

export type SignUpType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type UserProfileType = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UserPasswordType = {
  oldPassword: string;
  newPassword: string;
};
