import sendgridMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

class SenderSendGrid {
  async send(msg) {
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sendgridMail.send({
      ...msg,
      from: process.env.SENDER_SENDGRID,
    });
  }
}

class SenderNodemalier {
  async send(msg) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...msg,
      from: process.env.NODEMAILER_USER,
    });
  }
}

export { SenderSendGrid, SenderNodemalier };
