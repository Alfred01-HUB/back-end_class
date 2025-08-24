// mailer.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


// Reusable transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const sendEmail = async (to, subject, templateName, variables = {}) => {

  const templatePath = path.join(__dirname, 'templates', templateName);

  let html = fs.readFileSync(templatePath, 'utf-8');

  // Replace {{placeholders}} with actual values
  for (const key in variables) {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(pattern, variables[key]);
  }


  const mailOptions = {
    from: `"Test App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error while sending email:', error);
    }
    console.log('Email sent:', info.messageId);
    console.log('Email receiver:', mailOptions.to);
  });
  
};
module.exports = sendEmail;
