require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function send({ from, to, text }) {
  sgMail.send({ from, to, text, subject: "Request updated!" });
}

module.exports = {
  send,
};
