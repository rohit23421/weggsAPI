const User = require("../models/user");
const Otp = require("../models/otp");
const bcrypt = require("bcrypt");
const otpgenrator = require("otp-generator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// const msg91OTP = require("msg91-lib").msg91OTP;
// const msg91otp = new msg91OTP({
//   authKey: "374623A85ve8TcVaj6232e695P1",
//   templateId: "6261691dc4dbdc58d3127408",
// });

// //OTP SMS msg91
// const SendOtp = require("sendotp");
// const sendOtp = new SendOtp("374623A85ve8TcVaj6232e695P1");

//OTP SMS msg91 alternative library
// const msg91 = require("msg91")("374623A85ve8TcVaj6232e695P1", "rweggs ", "4");

exports.signup = async (req, res) => {
  const user = await User.findOne({
    number: req.body.number,
  });
  if (user) {
    return res.status(400).json("USER ALREADY REGISTERED");
  }
  const OTP = otpgenrator.generate(4, {
    digits: true,
    alphabets: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  //store te passed number by user for further processing
  const number = req.body.number;
  console.log(OTP);

  //concatinating number with country code
  var codenumber = 91 + number;
  console.log(typeof codenumber, codenumber, typeof OTP, OTP);

  // args = {
  //   // ...
  //   OTP: OTP,
  //   // otp_expiry: 5, // this will be in minute
  //   // ...
  // };

  // try {
  //   const response = await msg91otp.send(codenumber, args); // can be passed without country code and as string
  //   console.log(response);
  // } catch (error) {
  //   console.log(error.toJson());
  // }

  const http = require("https");

  try {
    const options = {
      method: "GET",
      hostname: "api.msg91.com",
      port: null,
      path:
        "/api/v5/otp?template_id=6261691dc4dbdc58d3127408&mobile=" +
        codenumber +
        "&authkey=374623A85ve8TcVaj6232e695P1&otp=" +
        OTP,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requt = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    // req.write('{"Value1":"Param1","Value2":"Param2","Value3":"Param3"}');
    requt.end();
  } catch (error) {
    return res.status(400).send({
      message: "ERROR IN SENDING MSG FROM MSG91",
      error,
    });
  }

  // //send OTP in SMS - msg91 Alternative way
  // msg91.send(number, "MESSAGE", function (err, response) {
  //   console.log(err);
  //   console.log(response);
  // });

  // sendOtp.send(codenumber, "rweggs", "4635", function (error, data) {
  //   console.log(data);
  // });

  //send OTP in SMS - msg91
  // sendOtp.send(codenumber, "rweggs", OTP, function (error, data) {
  //   if (error) {
  //     console.log(error);
  //   }
  //   console.log({
  //     sucess: true,
  //     data,
  //   });
  // });

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
  // try {
  //   const response = await msg91otp.verify(codenumber); // can be passed without country code and as number(int)
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }

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

// exports.verifiedOtpUserSignup = async (req, res) => {
//   try {
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.SECRET_KEY
//       ).toString(),
//       number: req.body.number,
//       address: req.body.address,
//     });
//     const newUser = await user.save();
//     res.status(200).json({
//       success: true,
//       message: "USER SIGNED UP SUCCESSFULLY",
//       newUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error,
//     });
//   }
// };

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
    //console.log(FoundUser);

    if (!FoundUser) {
      return res.status(404).json("USER NOT FOUND,NO SUCH USER IN DB");
    }
    // !FoundUser && res.status(404).json("USER NOT FOUND,NO SUCH USER IN DB");

    //console.log(FoundUser.password);
    const bytes = CryptoJS.AES.decrypt(
      FoundUser.password,
      process.env.SECRET_KEY
    );
    //console.log(bytes);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    //console.log(`pass is ${originalPassword}`);
    //console.log(req.body.password);

    if (originalPassword != req.body.password) {
      return res
        .status(404)
        .json("USER NOT FOUND,NO SUCH USER IN DB,OR INCORRECT PASSWORD");
    }
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

exports.updateUser = async (req, res) => {
  //exports.updateOrder = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN UPDATING USER",
      error,
    });
  }
};
