const nodemailer = require("nodemailer");

async function sendEmail(param){
  const {receiver, confirmationCode} = param;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    },
  });

  try{
    const info = await transporter.sendMail({
        from: "guessMate", 
        to: receiver, 
        subject: "Confrim E-Mail", 
        html: `<p> Please click on <a href="${process.env.API_URL}/sign-up?conf=${confirmationCode}">this link</a> to confirm your E-Mail. </p>`
    });
  }
  catch(err){
    throw err;
  }
}


module.exports = {sendEmail};
