import SibApiV3Sdk from "sib-api-v3-sdk";
import axios from "axios";

let defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix['api-key'] = "Token"

// Configure API key authorization: partner-key
let partnerKey = defaultClient.authentications["partner-key"];
partnerKey.apiKey = process.env.SIB_API_KEY;
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix['partner-key'] = "Token"

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export const sendOtp = async (name, email, otp) => {
  try {
    const result = await axios.post(
      "https://api.sendinblue.com/v3/smtp/email",
      {
        sender: {
          name: "Apna Mart support",
          email: "devshubhamyadav@gmail.com",
        },
        to: [
          {
            email: email,
            name: name,
          },
        ],
        params: {
          NAME: name,
          OTP: otp,
        },
        replyTo: {
          email: "devshubhamyadav@gmail.com",
          name: "Apna Mart",
        },
        subject: `Apna Mart user signup verification Code!`,
        templateId: 5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.SIB_API_KEY,
          accept: "application/json",
        },
      }
    );
    console.log(result.data);
  } catch (err) {
    sendSmtpEmail.subject = `Dear Customer, Your OTP is ${otp}. Please do not share it with anyone. For more info, please mail us on devshubhamyadav@gmail.com, Regards Apna Mart Purnea`;
    sendSmtpEmail.sender = {
      name: "Apna Mart",
      email: "devshubhamyadav@gmail.com",
    };
    sendSmtpEmail.to = [{ email: email, name: name }];
    sendSmtpEmail.replyTo = {
      email: "devshubhamyadav@gmail.com",
      name: "Apna Mart",
    };
    sendSmtpEmail.params = { NAME: name };
    sendSmtpEmail.templateId = 5;
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  }
};
