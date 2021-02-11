import {
  REXP_EMAIL,
  REXP_LOGIN,
  REXP_LITERAL,
  REXP_NUMERAL,
  REXP_GAP
} from './regExps';

const typeValidErrors = {
  FORMAT_ERROR: 'Неверный формат',
  LITERAL_ERROR: 'Ваш пароль должен содержать хотя латинские литералы',
  NUMERAL_ERROR: 'Ваш пароль должен содержать хотя бы одну цифру',
  GAP_ERROR: 'Пробелы не допускаются',
  PWDR_ERROR: 'Пароли не совпадают'
};

export function isValidEmail(email: string) {
  let result = '';

  if (email.length < 5) {
    result = 'Длина не может быть меньше 5';
  }
  if (!REXP_EMAIL.test(email)) {
    result = typeValidErrors.FORMAT_ERROR;
  }
  if (email.search(REXP_GAP) >= 0) {
    result = typeValidErrors.GAP_ERROR;
  }

  return result;
}

export function isValidLogin(login: string) {
  let result = '';

  if (login.length < 5) {
    result = 'Длина не может быть меньше 5';
  }
  if (!REXP_LOGIN.test(login)) {
    result = typeValidErrors.FORMAT_ERROR;
  }
  if (login.search(REXP_GAP) >= 0) {
    result = typeValidErrors.GAP_ERROR;
  }

  return result;
}

export function isValidName(name: string) {
  let result = '';

  if (name.length < 5) {
    result = 'Длина не может быть меньше 5';
  }
  if (name.search(REXP_GAP) >= 0) {
    result = typeValidErrors.GAP_ERROR;
  }

  return result;
}

export function isValidPassword(
  password: string,
  passwordConfirm: string | undefined = undefined
) {
  let result = '';

  if (password.length < 8) {
    result = 'Длина не может быть меньше 8';
  }
  if (password.search(REXP_GAP) >= 0) {
    result = typeValidErrors.GAP_ERROR;
  }
  if (password.search(REXP_LITERAL) < 0) {
    result = typeValidErrors.LITERAL_ERROR;
  }
  if (password.search(REXP_NUMERAL) < 0) {
    result = typeValidErrors.NUMERAL_ERROR;
  }
  if (passwordConfirm !== undefined && !(password === passwordConfirm)) {
    result = typeValidErrors.PWDR_ERROR;
  }

  return result;
}
