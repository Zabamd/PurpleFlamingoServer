const DatabaseHandler = require("../utility/DatabaseHandler");
class User {
  constructor(email, password, username, firstName, secondName,  birthday, userId) {
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
  checkIfAccountExist = () => {
    const query = `SELECT * FROM user WHERE email=?`;
    const result = DatabaseHandler.queryData(query, [this.email]);
    return result.statusCode === 200;
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

  getUser = () => {
    const query = `SELECT * FROM user WHERE userId=?`;
    const result = DatabaseHandler.queryData(query, [this.userId]);
    return result;
  };
  changePassword = (newPassword) => {
    const query = `UPDATE users SET password=? WHERE email=? `;
    const result = DatabaseHandler.queryData(query, [newPassword, this.email]);
    return result;
  };
}
module.exports = User;
