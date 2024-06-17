export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const capitalFirst = (string) => {
  return string[0].toUpperCase() + string.substring(1).toLowerCase();
};
