//#########################################################//
//
//  NOT FOR USE IN REAL CODE
//
//#########################################################//

const cookieToken = (FoundUser, res) => {
  const accessToken = jwt.sign(
    {
      id: FoundUser._id,
      isAdmin: FoundUser.isAdmin,
      number: FoundUser.number,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  FoundUser.password = undefined;

  // const accessToken = req.cookies.accessToken;
  // if (!accessToken) {
  //   res.status(403).json("PROBLEM WITH COOKIE");
  // }

  res.status(200).cookie("accessToken", accessToken, options).json({
    success: true,
    message: "TOKEN SENT",
    accessToken,
    FoundUser,
  });

  // try {
  //   const data = jwt.verify(accessToken, process.env.JWT_SECRET);
  //   req.id = data.id;
  //   req.isAdmin = data.isAdmin;
  //   req.number = data.number;
  //   next();
  // } catch (error) {
  //   res.status(403).json("PROBLEM WITH COOKIE FROM TRYCATCH");
  // }
};

module.exports = cookieToken;
