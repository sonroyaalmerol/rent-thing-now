import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise<string | null | undefined>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  if (!accessToken) {
    throw new Error('No access token');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions: nodemailer.SendMailOptions) => {
  const emailTransporter = await createTransporter();
  await emailTransporter.sendMail({
    from: process.env.EMAIL,
    ...emailOptions,
  });
};

export default sendEmail;
