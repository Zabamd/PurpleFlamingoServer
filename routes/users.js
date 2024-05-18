const express = require("express");
const UtilityResponse = require("../utility/UtilityResponse");
const User = require("../classes/User");
const router = express.Router();

router.post("/admin/login", function (req, res) {
  const { reqEmail, reqPassword } = req.body;

  if (!reqEmail || !reqPassword) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }
  const user = new User(reqEmail, reqPassword);
  const dbResponse = user.loginUser(reqEmail, reqPassword);
  return res.status(dbResponse.statusCode).json(dbResponse);
});

router.post("/admin/register", function (req, res) {
  const { email, password, username, firstName, secondName, birthday } = req.body;
  const dbResponse = "";
  const user = new User(email, password, username, firstName, secondName, birthday);

  if (!email || !password || !username || !firstName || !secondName, !birthday) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }

  if (user.checkIfAccountExist(email)) {
    //Email olready in use
    dbResponse = UtilityResponse.generateResponse(380);
  } else {
    dbResponse = user.registerAccount([
      email,
      password,
      username,
      firstName,
      secondName,
      birthday
    ]);
  }
  return res.status(dbResponse.statusCode).json(dbResponse);
});

router.get("/admin/get/", function (req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }
  const user = new User(email);
  const dbResponse = user.getUser(email);
  return res.status(dbResponse.statusCode).json(dbResponse);
});

router.put("/admin/changePassword", function (req, res) {
  const { email, oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword || !email) {
    return res.status(400).json(UtilityResponse.generateResponse(400));
  }

  const user = new User(email, oldPassword);
  const dbResponse = user.loginUser(email, oldPassword);

  if (dbResponse.statusCode !== 200 || dbResponse.data === null) {
    return res.status(dbResponse.statusCode).json(dbResponse);
  }

  dbResponse = user.changePassword(newPassword);
  return res.status(dbResponse.statusCode).json(dbResponse);
});

module.exports = router;
