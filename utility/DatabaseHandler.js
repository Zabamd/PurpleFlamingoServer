const { createConnection } = require("mysql");
const { config } = require("dotenv");
const UtilityResponse = require("./UtilityResponse");

//.env Config
config();

class DatabaseHandler {
  static #connectionEndpoint = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  };

  static queryData = (sqlQuery, valueArray) => {
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
}
module.exports = DatabaseHandler;
