const User = require("../models/user");
const Otp = require("../models/otp");
const bcrypt = require("bcrypt");
const otpgenrator = require("otp-generator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//OTP SMS msg91
const SendOtp = require("sendotp");
const sendOtp = new SendOtp("373306AZKF6wNK62107f68P1");

exports.signup = async (req, res) => {
  const user = await User.findOne({
    number: req.body.number,
  });
  if (user) {
    return res.status(400).json("USER ALREADY REGISTERED");
  }
  const OTP = otpgenrator.generate(6, {
    digits: true,
    alphabets: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  //store te passed number by user for further processing
  const number = req.body.number;
  console.log(OTP);

  //send OTP in SMS - msg91
  const codenumber = 91 + number;
  console.log(typeof codenumber, codenumber, typeof OTP, OTP);
  sendOtp.send(codenumber, "otptst", OTP, function (error, data) {
    if (error) {
      console.log(error);
    }
    console.log({
      sucess: true,
      data,
    });
  });

  const otp = new Otp({ number: number, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  return res.status(200).json({
    success: true,
    message: "OTP SENT SUCCESSFULLY",
    result,
  });
};

exports.verifyOtp = async (req, res) => {
  const otpHolder = await Otp.find({
    number: req.body.number,
  });
  if (otpHolder.length === 0) return res.status(400).json("OTP EXPIRED");
  const otpfromdb = otpHolder[otpHolder.length - 1];
  const validotp = await bcrypt.compare(req.body.otp, otpfromdb.otp);

  if (otpfromdb.number === req.body.number && validotp) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      number: req.body.number,
      address: req.body.address,
    });
    try {
      const newUser = await user.save();
      res.status(200).json({
        success: true,
        message: "USER SIGNED UP SUCCESSFULLY",
        newUser,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }

    //deleting other otps other than newest one
    const deleteOtp = await Otp.deleteMany({
      number: otpfromdb.number,
    });
  } else {
    return res.status(400).json("INVALID OTP");
  }
};

const authorization = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(403).json("PROBLEM WITH COOKIE");
  }
  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.id = data.id;
    req.isAdmin = data.isAdmin;
    req.number = data.number;
    next();
  } catch (error) {
    res.status(403).json("PROBLEM WITH COOKIE FROM TRYCATCH");
  }
};

exports.verifyOtpLogin = async (req, res) => {
  try {
    const FoundUser = await User.findOne({ number: req.body.number });
    !FoundUser && res.status(404).json("USER NOT FOUND,NO SUCH USER IN DB");

    const bytes = CryptoJS.AES.decrypt(
      FoundUser.password,
      process.env.JWT_SECRET
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    !originalPassword === req.body.password &&
      res
        .status(404)
        .json("USER NOT FOUND,NO SUCH USER IN DB,OR INCORRECT PASSWORD");

    //generating jwt token
    const accessToken = jwt.sign(
      {
        id: FoundUser._id,
        isAdmin: FoundUser.isAdmin,
        number: FoundUser.number,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    const { password, ...info } = FoundUser._doc;

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "USER LOGIN SUCCESSFULL",
        ...info,
        accessToken,
      });
  } catch (error) {
    res.status(500).json({
      error,
      message: "ERROR IN verifyOtpLogin",
    });
  }
};

exports.logout = async (req, res) => {
  return res.clearCookie("accessToken").status(200).json({
    success: true,
    message: "SUCCESSFULLY LOGGED OUT",
  });
};
