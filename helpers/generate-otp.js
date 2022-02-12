export const generateOTP = (length) => {
  const string = '123456789';
  let OTP = '';
  const len = string.length;
  for (let i = 0; i < length; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
};
