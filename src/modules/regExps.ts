export const REXP_EMAIL = new RegExp(
  '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$'
);
export const REXP_LOGIN = new RegExp('^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$');
export const REXP_LITERAL = /[a-z]/i;
export const REXP_NUMERAL = /[0-9]/;
export const REXP_GAP = /\s/g;
