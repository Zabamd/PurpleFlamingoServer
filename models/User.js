import { response } from "express";

export default class User {
  constructor(userId, email, username, firstName, password) {
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.secondName = secondName;
    this.password = password;
  }

  loginAuth = (emailInput, usernameInput, passwordInput) => {
    reurn(
      (usernameInput === this.username || emailInput === this.email) &&
        passwordInput === this.password
    );
  };
  registerAccount = () => {
    let response = "";
    if (!checkIfAccountExist(this.email)) {
      if (!registerUser(this)) {
        response = {
          message: "error creating account",
          status: "error_creating_account",
          statusCode: 500,
        };
      } else {
        response = {
          message: "Account created",
          status: "created",
          statusCode: 201,
        };
      }
    } else {
      response = {
        message: "Emial already in use",
        status: "email_address_in_use",
        statusCode: 380,
      };
    }
    return response;
  };
}
