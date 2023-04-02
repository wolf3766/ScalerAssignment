import nodemailer from "nodemailer"
import { Request,Response } from "express";

const sendMail = async (req:Request, res:Response) => {
  let testAccount = await nodemailer.createTestAccount();
  const receiver=req.query.email
  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: 'aurelie.abshire@ethereal.email',
      pass: 'vPpzTcyzvYRFFCagU5'
  },
  });

  let info = await transporter.sendMail({
    from: '"Cab Bookers👻" <cab@gmail.com>', // sender address
    to: `${receiver}`, // list of receivers
    subject: "Cab Booked", // Subject line
    text: "hello enjoy the ride", // plain text 
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

export default sendMail;