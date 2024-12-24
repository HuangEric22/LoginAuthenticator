import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const HOST = process.env.EMAIL_AUTHENTICATION_HOST;
const USERNAME = process.env.EMAIL_AUTHENTICATION_USERNAME;

export const transportClient = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: false,
    auth: {
      user: USERNAME,
      pass: TOKEN
    }
  });

export const sender = {
  address: "nachenflopper@demomailtrap.com",
  name: "Eric Huang",
};
