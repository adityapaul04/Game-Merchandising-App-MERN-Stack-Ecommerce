const nodemailer = require('nodemailer');

const sendEmail = async options => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "92b46f30cd9263",
          pass: "f09c535fb743ec"
        }
      });
      const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
      }

      await transport.sendMail(message)
}

module.exports = sendEmail;