var nodemailer = require("nodemailer");

module.exports.MessageMailer = async function (email, name, checkIn, room) {
  const date = new Date(checkIn);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  let details = {
    from: "styles132001@gmail.com",
    to: "psxw2001@gmail.com",
    subject: "MrStudio Hotel",
    text: `Dear ${name}, Thank you for choosing to stay with us at MrStudio Hotel! We are excited to have you as our guest from ${date.toDateString()}. Room type ${room}`,
    // html: "<b>Hello world?</b>",
  };

  transporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email successfully sent.");
    }
  });
};
