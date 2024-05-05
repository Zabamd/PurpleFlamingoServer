export default class UtilityResponse {
  static generateResponse = (code, result = null) => {
    switch (code) {
      case 500:
        return {
          message: "Can't establish connection",
          status: "Internal server error",
          statusCode: 500,
        };
      case 380:
        return {
          message: "Emial already in use",
          status: "email_address_in_use",
          statusCode: 380,
        };
      case 201:
        return {
          message: "Account created",
          status: "created",
          statusCode: 201,
        };
      case 200:
        return {
          message: "success",
          data: result,
          statusCode: 200,
          status: "success",
        };
    }
  };
}
