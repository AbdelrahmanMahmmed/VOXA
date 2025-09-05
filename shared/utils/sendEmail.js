const nodemailer = require("nodemailer");
const sendtoEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AUTH_HOST_SEND_EMAIL,
    port: process.env.AUTH_PORT_SEND_EMAIL,
    secure: true,
    auth: {
      user: process.env.AUTH_USER_SEND_EMAIL,
      pass: process.env.AUTH_PASSWORD_SEND_EMAIL,
    },
  });
  const mailOptions = {
    from: `"VOXA" <${process.env.AUTH_USER_SEND_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendtoEmail;
