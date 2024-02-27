let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  //   logger: true,
  //   debug: true,
  secureConnection: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

function sendMails(mails, task) {
  let mailOptions = {
    from: process.env.MAIL_USER,
    to: mails.join(", "),
    subject: "New Task added in application",
    html: `
        <h1>New Task Added</h1>
        <p>A new task has been added to the application:</p>
        <ul>
            <li><strong>Task:</strong> ${task.name}</li>
            <li><strong>Description:</strong> ${task.description}</li>
            <li><strong>Site Link:</strong> <a href="https://task-management-application-hazel.vercel.app/">Your App</a></li>
        </ul>
        <p>Check out the app to view the new task and manage your tasks!</p>
     `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendMails;
