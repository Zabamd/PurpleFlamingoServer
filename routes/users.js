import express from "express";
import User from "../classes/User.js";
import DatabaseHandler from "../utility/DatabaseHandler.js";
import UtilityResponse from "../utility/UtilityResponse.js";
const router = express.Router();

router.get("/admin/login", function (req, res) {
  const { reqEmail, reqPassword } = req.body;
  if (!reqEmail || !reqPassword) {
    return res.status(400).json({ message: "Request without necessary data" });
  }
  const dbResponse = DatabaseHandler.loginUser(reqEmail, reqPassword);
  return res.status(dbResponse.statusCode).json(dbResponse);
});

router.get("/admin/register", function (req, res) {
  const { email, password, username, firstName, secondName } = req.body;
  const dbResponse = "";

  if (DatabaseHandler.checkIfAccountExist(email)) {
    //Email olready in use
    dbResponse = UtilityResponse.generateResponse(380);
  } else {
    dbResponse = DatabaseHandler.registerAccount([
      email,
      password,
      username,
      firstName,
      secondName,
    ]);
  }
  return res.status(dbResponse.statusCode).json(dbResponse);
});

router.get("/admin/get/:userId", function (req, res) {
  const userId = req.params["userId"];
  const dbResponse = DatabaseHandler.getUser(userId);
  return res.status(dbResponse.statusCode).json(dbResponse);
});

router.put("/admin/get/:userId/changePassword/:password", function (req, res) {
  const { userId, password } = req.params;
  const dbResponse = DatabaseHandler.updateData(userId, password);
  return res.status(dbResponse.statusCode).json(dbResponse);
});
export default router;
