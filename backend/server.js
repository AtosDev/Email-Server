const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const nodemailer = require('nodemailer');

const cors = require("cors");

const app = express();

//Add Cors
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


// DB Config
// const db = require("./config/keys").mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

// // Passport middleware
// app.use(passport.initialize());

// // Passport config
// require("./config/passport")(passport);

// Routes
// app.use("/api/logo", accesslogo);


const mailSend = () => {

  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'contact.carlosel@gmail.com',
      pass: '!Hsj980725~'
    }
  };
  const transporter = nodemailer.createTransport(smtpConfig);

  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: 'contact.carlosel@gmail.com',
    to: 'Ampeters7@aol.com, Blessedmimi2017@yahoo.com, dev.thomas128@gmail.com',
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
  });

}

const port = process.env.SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`Server up and running on port ${port} !`)
  mailSend();
});