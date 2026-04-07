import nodemailer from 'nodemailer';

function getTransporter() {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

  if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: Number(MAIL_PORT) === 465,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  });
}

export async function enviarCorreoPedido({ to, subject, text, html }) {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error('Configuracio SMTP incompleta');
  }

  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject,
    text,
    html
  });
}
