const User = require("../models/user");
const Otp = require("../models/otp");
const bcrypt = require("bcrypt");
const otpgenrator = require("otp-generator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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
        succes: true,
        message: "USER SIGNED UP SUCCESSFULLY",
        newUser,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }

    //deleting other otps other than newes one
    const deleteOtp = await Otp.deleteMany({
      number: otpfromdb.number,
    });
  } else {
    return res.status(400).json("INVALID OTP");
  }
};

exports.login = async (req, res) => {
  try {
    //finding the user from the db
    const user = await User.findOne({ number: req.body.number });
    if (!user) {
      return res.status(404).json("USER NOT FOUND,NO SUCH USER IN DB");
    }
    // !user && res.status(404).json("USER NOT FOUND,NO SUCH USER IN DB");

    //generating otp for login
    if (user) {
      const OTP = otpgenrator.generate(6, {
        digits: true,
        alphabets: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      //store the passed number by user for further processing/validation
      const number = req.body.number;
      console.log(OTP);

      const otp = new Otp({ number: number, otp: OTP });
      const salt = await bcrypt.genSalt(10);
      otp.otp = await bcrypt.hash(otp.otp, salt);
      const result = await otp.save();
      return res.status(200).json({
        success: true,
        message: "OTP SENT SUCCESSFULLY",
        result,
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.verifyOtpLogin = async (req, res) => {
  const otpHolder = await Otp.find({
    number: req.body.number,
  });
  if (otpHolder.length === 0) return res.status(400).json("OTP EXPIRED");
  const otpfromdb = otpHolder[otpHolder.length - 1];
  const validotp = await bcrypt.compare(req.body.otp, otpfromdb.otp);

  if (otpfromdb.number === req.body.number && validotp) {
    try {
      const FoundUser = await User.findOne({ number: req.body.number });

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

      res.status(200).json({
        succes: true,
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

    //deleting other otps other than newes one
    const deleteOtp = await Otp.deleteMany({
      number: otpfromdb.number,
    });
  } else {
    return res.status(400).json("INVALID OTP");
  }
};
