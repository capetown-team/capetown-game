import {
  REXP_EMAIL,
  REXP_LOGIN,
  REXP_LITERAL,
  REXP_NUMERAL,
  REXP_GAP,
  REXP_PHONE
} from './regExps';

const typeValidErrors = {
  FORMAT_ERROR: 'Неверный формат',
  LITERAL_ERROR: 'Ваш пароль должен содержать хотя латинские литералы',
  NUMERAL_ERROR: 'Ваш пароль должен содержать хотя бы одну цифру',
  GAP_ERROR: 'Пробелы не допускаются',
  PWDR_ERROR: 'Пароли не совпадают'
};

export const isValidEmail = (email: string) => {
  if (email.length < 5) {
    return 'Длина не может быть меньше 5';
  }
  if (!REXP_EMAIL.test(email)) {
    return typeValidErrors.FORMAT_ERROR;
  }
  if (email.search(REXP_GAP) >= 0) {
    return typeValidErrors.GAP_ERROR;
  }

  return '';
};

export const isValidPhone = (phone: string) => {
  if (!REXP_PHONE.test(phone)) {
    return typeValidErrors.FORMAT_ERROR;
  }

  return '';
};

export const isValidLogin = (login: string) => {
  if (login.length < 5) {
    return 'Длина не может быть меньше 5';
  }
  if (!REXP_LOGIN.test(login)) {
    return typeValidErrors.FORMAT_ERROR;
  }
  if (login.search(REXP_GAP) >= 0) {
    return typeValidErrors.GAP_ERROR;
  }

  return '';
};

export const isValidName = (name: string) => {
  if (name.length < 5) {
    return 'Длина не может быть меньше 5';
  }
  if (name.search(REXP_GAP) >= 0) {
    return typeValidErrors.GAP_ERROR;
  }

  return '';
};

export const isValidPassword = (password: string) => {
  if (password.length < 8) {
    return 'Длина не может быть меньше 8';
  }
  if (password.search(REXP_GAP) >= 0) {
    return typeValidErrors.GAP_ERROR;
  }
  if (password.search(REXP_LITERAL) < 0) {
    return typeValidErrors.LITERAL_ERROR;
  }
  if (password.search(REXP_NUMERAL) < 0) {
    return typeValidErrors.NUMERAL_ERROR;
  }

  return '';
};

export const isValidPasswordConfirm = (
  password: string,
  passwordConfirm: string | undefined = undefined
) => {
  if (passwordConfirm !== undefined && !(password === passwordConfirm)) {
    return typeValidErrors.PWDR_ERROR;
  }

  return '';
};
