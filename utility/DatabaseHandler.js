import { createConnection } from "mysql";
import { config } from "dotenv";

import UtilityResponse from "./UtilityResponse";

//.env Config
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

}

export default DatabaseHandler;
