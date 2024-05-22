const express = require("express");
const UtilityResponse = require("../utility/UtilityResponse");
const User = require("../classes/User");
const router = express.Router();

router.get("/admin/login", function (req, res) {
  const { reqEmail, reqPassword } = req.query;

  if (!reqEmail || !reqPassword) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }
  const user = new User(reqEmail, reqPassword);
  const dbResponse = user.loginUser();
  if (dbResponse.statusCode === 200) {
    const userData = {
      userId: dbResponse.userId,
      username: dbResponse.username,
    };
    return res
      .status(200)
      .json(UtilityResponse.generateResponse(200, userData));
  } else {
    return res
      .status(dbResponse.statusCode)
      .json(UtilityResponse.generateResponse(dbResponse.statusCode));
  }
});

router.post("/admin/register", function (req, res) {
  const { email, password, username, firstName, secondName, birthday } =
    req.body;
  if (
    (!email || !password || !username || !firstName || !secondName, !birthday)
  ) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }
  const dbResponse = "";
  const user = new User(
    email,
    password,
    username,
    firstName,
    secondName,
    birthday,
    null
  );
  dbResponse = user.registerAccount();
  if (dbResponse.statusCode === 200) {
    const userData = {
      userId: dbResponse.userId,
      email,
    };
    return res
      .status(200)
      .json(UtilityResponse.generateResponse(200, userData));
  } else {
    return res
      .status(dbResponse.statusCode)
      .json(UtilityResponse.generateResponse(dbResponse.statusCode));
  }
});

router.get("/:userID", function (req, res) {
  const { userID } = req.params.userID;
  if (!userID) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }
  const dbResponse =  User.getUser(userID);
  return res.status(dbResponse.statusCode).json(dbResponse);
});

module.exports = router;
