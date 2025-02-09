import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // add your email
    pass: "", // add your password
  },
});
const data = fs.readFileSync(
  path.resolve("src", "public", "html", "mailTemplate.html")
);
export const sendConfirmationMail = async (userEmail) => {
  const message = {
    from: "",
    to: userEmail,
    subject: "Job Application Received",
    html: data,
  };

  transporter.sendMail(message, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(res);
    }
  });
};
