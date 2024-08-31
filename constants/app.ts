export const MATCH_EMAIL = new RegExp(
  /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/
);

export const MATCH_PASSWORD = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/);

export const MATCH_TEXT = new RegExp(/^[a-zA-Z ]+$/);

export const MATCH_STRING = new RegExp(/^[a-zA-Z0-9 ]+$/);

export const MATCH_ZIPCODE = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);

export const MATCH_PHONE = new RegExp(/^([3|5|7|8|9])+([0-9]{8})$/);

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
