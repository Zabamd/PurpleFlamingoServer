import { createConnection } from "mysql";
import { config } from "dotenv";

config();

class DatabaseConnector {
  #connection;
  #connectionEndpoint = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  };

  establishConnection() {
    try {
      this.#connection = createConnection(this.#connectionEndpoint);
    } catch (error) {
      console.log(err);
      return false;
    }
    return true;
  }

  queryData(sqlQuer){
    
  }

  endConnection() {
    try {
      this.#connection.end();
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}

export default DatabaseConnector;
