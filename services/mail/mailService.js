const configOptions = require('nodemailer').createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = {
  sendActivationMail: async (to, link) =>
    await configOptions.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Activation Link' + process.env.URL,
      text: '',
      html: `<div>
          <h1>To activate follow the link</h1>
          <a href='${link}'>${link}</a>
        </div>`,
    }),
};
