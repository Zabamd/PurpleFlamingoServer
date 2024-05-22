const DatabaseHandler = require("../utility/DatabaseHandler");
class User {
  constructor(
    email,
    password,
    username,
    firstName,
    secondName,
    birthday,
    userId
  ) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.secondName = secondName;
    this.birthday = birthday;
  }

  toArray = () => {
    return Object.values(this);
  };

  loginUser = () => {
    const query = `SELECT * FROM user WHERE email=? AND password=?`;
    const result = DatabaseHandler.queryData(query, [
      this.email,
      this.password,
    ]);
    return result;
  };

  registerAccount = () => {
    const query = `INSERT INTO users (email,password,,username, firstName, secondName, birthday) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = DatabaseHandler.queryData(query, [this.toArray()]);
    return result;
  };

  static getUser = (userId) => {
    const query = "SELECT * FROM user WHERE userId=?";
    try {
      const result = DatabaseHandler.queryData(query, [userId]);
      if (result.length === 0) {
        return UtilityResponse.generateResponse(404, "User not found");
      }
      const userRow = result[0];
      const user = new User(
        userRow.userId,
        userRow.email,
        userRow.password,
        userRow.username,
        userRow.firstName,
        userRow.secondName,
        userRow.birthday
      );
      return UtilityResponse.generateResponse(200, user);
    } catch (error) {
      return UtilityResponse.generateResponse(500);
    }
  };
}
module.exports = User;
