import SibApiV3Sdk from "sib-api-v3-sdk";
import axios from "axios";

let defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

let partnerKey = defaultClient.authentications["partner-key"];
partnerKey.apiKey = process.env.SIB_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export const sendOtp = async (name, email, otp) => {
  try {
    const response = await axios.post(
      "https://api.sendinblue.com/v3/smtp/mail",
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
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};
