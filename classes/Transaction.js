const DatabaseHandler = require("../utility/DatabaseHandler");
const UtilityResponse = require("../utility/UtilityResponse");

class Transaction {
  constructor(transactionId, userId, actionId, amount, transactionDate) {
    this.transactionId = transactionId;
    this.userId = userId;
    this.actionId = actionId;
    this.amount = amount;
    this.transactionDate = transactionDate;
  }

saveTransaction() {
    const query = `
      INSERT INTO transaction (userId, actionId, amount, transactionDate)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const result =  DatabaseHandler.queryData(query, [
        this.userId,
        this.actionId,
        this.amount,
        this.transactionDate,
      ]);
      return UtilityResponse.generateResponse(200, result);
    } catch (error) {
      return UtilityResponse.generateResponse(500, error.message);
    }
  }
}

module.exports = Transaction;
