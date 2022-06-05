/* eslint no-console: 0*/
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid"); //require('../index');

const app = express();
var cors = require("cors");
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://maddogcarclub.io");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

const PORT = process.env.PORT || 5000;
app.use("/", router);
app.listen(PORT, () => console.log("Server Running on port " + PORT));

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey:
      "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",
  })
);

router.get("/", function (req, res) {
  res.send("this is running from heruko with port " + PORT);
});

router.post("/", (req, res) => {
  const pos1 = req.body.pos1;
  const name = req.body.name;
  const email = req.body.email;
  const linkedin = req.body.linkedin;
  const portfolio = req.body.portfolio;
  const my_file = req.body.my_file;
  const mail = {
    from: "Mad Dog Car Club <willhelmet042002@gmail.com>",
    to: "willhelmet042002@gmail.com",
    subject: `Applicant for ${pos1}`,
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Linkedin: ${linkedin}</p>
             <p>Portfolio: ${portfolio}</p>`,
    attachments: [
      {
        filename: `${my_file}`,
        path: `${__dirname}/attachment.docx`,
      },
    ],
  };
  transport.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
