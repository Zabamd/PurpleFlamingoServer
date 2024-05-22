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
    images
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
      "INSERT INTO action (ownerId, title, startDate, finishDate, currentAmount, goal, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      const result = DatabaseHandler.queryData(query, [
        this.ownerId,
        this.title,
        this.startDate,
        this.finishDate,
        this.currentAmount,
        this.goal,
        this.description,
        this.status,
      ]);
      return UtilityResponse.generateResponse(200, result);
    } catch (error) {
      return UtilityResponse.generateResponse(500, error.message);
    }
  };

  static getUserActions = (ownerId) => {
    const query = "SELECT * FROM action WHERE ownerID=?";
    try {
      const actionsResult = DatabaseHandler.queryData(query, [ownerId]);

      if (actionsResult.length === 0) {
        return UtilityResponse.generateResponse(
          404,
          "No actions found for this user"
        );
      }

      const actions = [];
      for (const actionRow of actionsResult) {
        const imagesQuery = "SELECT image FROM image WHERE actionID=?";
        const imagesResult = DatabaseHandler.queryData(imagesQuery, [
          actionRow.actionId,
        ]);

        const images = imagesResult.map((imageRow) => imageRow.image);

        const action = new Action(
          actionRow.actionId,
          actionRow.ownerId,
          actionRow.title,
          actionRow.startDate,
          actionRow.finishDate,
          actionRow.currentAmount,
          actionRow.goal,
          actionRow.description,
          actionRow.status,
          images
        );

        actions.push(action);
      }

      return UtilityResponse.generateResponse(200, actions);
    } catch (error) {
      return UtilityResponse.generateResponse(500, error.message);
    }
  };
}

module.exports = Action;
