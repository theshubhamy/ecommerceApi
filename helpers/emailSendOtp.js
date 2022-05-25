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
    const response = await axios.post(
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
          name: "Apna Mart Support",
        },
        subject: `Apna Mart Account Verification Code!`,
        templateId: 4,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.SIB_API_KEY,
          accept: "application/json",
        },
      }
    );
  } catch (err) {
    sendSmtpEmail.subject = `Apna Mart user signup verification Code! ${otp}. Valid for 2 mins!`;
    sendSmtpEmail.sender = {
      name: "Apna Mart SUPPORT",
      email: "devshubhamyadav@gmail.com",
    };
    sendSmtpEmail.to = [{ email: email, name: name }];
    sendSmtpEmail.replyTo = {
      email: "devshubhamyadav@gmail.com",
      name: "Apna Mart SUPPORT",
    };
    sendSmtpEmail.params = { NAME: name };
    sendSmtpEmail.templateId = 1;
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(error);
  }
};
