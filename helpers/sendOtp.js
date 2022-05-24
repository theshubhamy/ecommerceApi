import axios from "axios";

export const sendOtp = async (generatedOTP, phone) => {
  const message = `Dear Customer, Your OTP is ${generatedOTP}. Please do not share it with anyone. For more info, please call us 91-7981801434, Regards Ganveer B2B`;
  let url = `https://login.bulksmsgateway.in/sendmessage.php?user=${process.env.MSG_API_USERNAME}&password=${process.env.MSG_API_PASSWORD}&mobile=${phone}&message=${message}&sender=${process.env.SENDER}&type=${process.env.TYPE}&template_id=${process.env.TEMPLATE_ID}`;
  try {
    const res = await axios.get(url);
    console.log(res.data);
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};
