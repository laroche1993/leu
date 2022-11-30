const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const app = express();
const inlineBase64 = require("nodemailer-plugin-inline-base64");

app.use(cors({origin: true}));

app.post("/", (req: any, res: any) => {
  const {body} = req;
  const isValidMessage = body.text && body.to && body.subject;

  if (!isValidMessage) {
    return res.status(400).send({message: "invalid request"});
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  transporter.use("compile", inlineBase64({cidPrefix: "somePrefix_"}));

  const mailOptions = {
    from: body.email,
    to: body.to,
    subject: body.subject,
    html: body.text,
  };

  transporter.sendMail(mailOptions, (err: any) => {
    if (err) {
      return res.status(500).send({message: "error " + err.message});
    }

    return res.send({message: "email sent"});
  });
});

module.exports.mailer = functions.https.onRequest(app);
