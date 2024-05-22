class UtilityResponse {
  static generateResponse = (code, result = null) => {
    switch (code) {
      case 400:
        return {
          message: "Request without necessary data",
          status: "Bad Request",
          data: null,
          statusCode: 400,
        };
      case 380:
        return {
          message: "Emial already in use",
          status: "email_address_in_use",
          data: null,
          statusCode: 380,
        };
      case 201:
        return {
          message: "Account created",
          status: "created",
          data: null,
          statusCode: 201,
        };
      case 200:
        return {
          message: "success",
          data: result,
          statusCode: 200,
          status: "success",
        };
      case 500:
      default:
        return {
          message: "Can't establish connection",
          status: "Internal server error",
          data: null,
          statusCode: 500,
        };
    }
  };
}

module.exports = UtilityResponse;
