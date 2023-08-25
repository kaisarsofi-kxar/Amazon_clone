const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: true, credentials: true }));
const port = 6000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://kaisersofi:kaisar@cluster0.kaen7dw.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server running on port", port);
});

const User = require("./models/user");
const Order = require("./models/order");

//* function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kaisersofi.ks2515@gmail.com",
      pass: "mrdewpyswckzmwbb",
    },
  });

  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Please verify your email",
    text: `Please verify your email by clicking on the following link: http://localhost:6000/verify/${verificationToken}`,
  };
  //* send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("verification mail sent successfully");
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

//* end point to register a new user

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already Registered" });
    }

    //* create new user
    const newUser = new User({
      name,
      email,
      password,
    });
    //* generating and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //* save user to data base
    await newUser.save();

    //* send verification email
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification",
    });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

//* end point to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //* find the user with the given verification method
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    //* update the user's verified status
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

//* end point to login the user

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
