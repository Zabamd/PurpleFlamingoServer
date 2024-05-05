import { createConnection } from "mysql";
import { config } from "dotenv";
import UtilityResponse from "./UtilityResponse";

config();

class DatabaseHandler {
  #connectionEndpoint = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  };

  queryData = (sqlQuery, valueArray) => {
    const connection = createConnection(this.#connectionEndpoint);

    connection.connect((error) => {
      if (error) {
        console.log(error);
        return UtilityResponse.generateResponse(500);
      }

      connection.query(sqlQuery, valueArray, (error, result) => {
        if (error) {
          console.log(error);
          return UtilityResponse.generateResponse(500);
        }
        return UtilityResponse.generateResponse(200, result);
      });
    });
    connection.end((error) => {
      console.log(error);
      return UtilityResponse.generateResponse(500);
    });
  };
  
  static checkIfAccountExist = (email) => {
    const query = `SELECT * FROM user WHERE email=?`;
    const result = this.queryData(query, [email]);
    return result.statusCode === 200;
  };

  static loginUser = (email, password) => {
    const query = `SELECT * FROM user WHERE email=? AND password=?`;
    const result = this.queryData(query, [email, password]);
    return result;
  };
  
  static registerAccount = (userArray) => {
    const query = `INSERT INTO users (email,password,,username, firstName, secondName) VALUES (?, ?, ?, ?, ?)`;
    const result = this.queryData(query, [userArray]);
    return result;
  }
}

export default DatabaseHandler;
