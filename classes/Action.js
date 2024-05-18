const DatabaseHandler = require("../utility/DatabaseHandler");

const UtilityResponse = require("../utility/UtilityResponse");

class Action {
  constructor(
    actionId,
    ownerId,
    title,
    startDate,
    finishDate,
    currentAmount,
    goalAmount,
    description,
    status,
    images = null
  ) {
    this.actionId = actionId;
    this.ownerId = ownerId;
    this.title = title;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.currentAmount = currentAmount;
    this.goalAmount = goalAmount;
    this.description = description;
    this.status = status;
    this.images = images;
  }
  uploadAction = () => {
    let query =
      "INSERT INTO action (ownerID, title, startDate, finishDate, currentAmount, goal, description, status) VALUES (?,?,?,?,?,?,?,?)";
    const array = Object.values(this);
    let result = DatabaseHandler.queryData(query, [array.slice(0, -1)]);
    if (result.statusCode !== 200) {
      return UtilityResponse.generateResponse(400);
    }
  };
  getImages = () => {
    const query = "SELECT image FROM image WHERE actionID=?";
    const result = DatabaseHandler.queryData(query, [this.actionId]);
    return result;
  };
}

module.exports = Action;
