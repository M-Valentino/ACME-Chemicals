export const emailIsInvalid = (email: string) => {
  return !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/g);
};

export const emailIsTooLong = (email: string) => {
  return email.length > 40;
};

export const passwordLengthIsInvalid = (password: string) => {
  return password.length < 8 || password.length > 32;
};
