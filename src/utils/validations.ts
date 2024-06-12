export const nameIsInvalid = (name: string) => {
  return !name.match( /^[a-zA-Z ]*$/);
}

export const emailIsInvalid = (email: string) => {
  return !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/g);
};

export const emailOrNameIsTooLong = (input: string) => {
  return input.length > 40;
};

export const passwordLengthIsInvalid = (password: string) => {
  return password.length < 8 || password.length > 32;
};
