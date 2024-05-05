import DatabaseHandler from "../utility/DatabaseHandler";
import UtilityResponse from "../utility/UtilityResponse";

export default class User {
  constructor(userId, email, username, firstName, password) {
    this.userId = userId || null;
    this.email = email;
    this.password = password;
    this.username = username || null;
    this.firstName = firstName || null;
    this.secondName = secondName || null;
  }

  toArray = () => {
    return [
      this.email,
      this.password,
      this.username,
      this.firstName,
      this.secondName,
    ];
  };
  loginAuth = () => {
    return DatabaseHandler.loginUser(this.email, this.password);
  };
  registerAccount = () => {
    if (DatabaseHandler.checkIfAccountExist(this.email)) {
      //Email olready in use
      return UtilityResponse.generateResponse(380);
    } else {
      return DatabaseHandler.registerAccount(this.toArray());
    }
  };
}
