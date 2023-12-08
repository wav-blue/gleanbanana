export const validateEmail = (email) => {
  return (
    email &&
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
      email
    )
  );
};

export const validatePassword = (password) => {
  return (
    password &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(
      password
    )
  );
};
