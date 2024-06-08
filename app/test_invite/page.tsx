import nodemailer from 'nodemailer';

export default function handler() {
      const to = "yrlnsayfulla@gmail.com"; 
      const subject = "Hellow"
      const text = "This is test email"

      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'aibekminbaev04@gmail.com',
              pass: 'xjztlntivpzaguyt'
          }
      });

      const mailOptions = {
          from: 'aibekminbaev04@gmail.com',
          to: to,
          subject: subject,
          text: text
      };

      transporter.sendMail(mailOptions);
}
