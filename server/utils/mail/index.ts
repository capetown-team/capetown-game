import mailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const { EMAIL_FROM, EMAIL_PASS, EMAIL_TO } = process.env;

export const sendEmail = (from: string, name: string, text: string) => {
  const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_PASS
    }
  });

  const mail = {
    from: `pacman <${from}>`,
    to: EMAIL_TO,
    subject: `Сообщение от ${name}`,
    text: 'Message our pacman mail',
    html: `<p>${text}</p><p>Email отправителя: <span>${from}</span></p>`
  };

  smtpTransport.sendMail(mail, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('err send mail', err);
    }
    smtpTransport.close();
  });
};
