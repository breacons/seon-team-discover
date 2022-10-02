export const convertEmptyToNull = (value: string | number | undefined | boolean) => {
  return value === '' ? null : value;
};
