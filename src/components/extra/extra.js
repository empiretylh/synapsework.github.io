//number with commas for currency

export const numberWithCommas = (x='0') => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// email validation
export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// username validation no space
export const validateUsername = (username) => {
  var re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
};

// phone no validation 6 to 20 digit

export const validatePhone = (phone) => {
  var re = /^\d{6,20}$/;
  return re.test(phone);
};

// password validation 6 to 20 digit

export const validatePassword = (password) => {
  var re = /^\d{6,20}$/;
  return re.test(password);
};

export const isValidFCMToken = (token) => {
  if(!token) return false;
  return /^[a-zA-Z0-9:_-]+$/.test(token)
};
