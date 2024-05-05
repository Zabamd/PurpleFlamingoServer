export default class Action {
  constructor(actionId, ownerId, title, startDate, finishDate, currentAmount, goalAmount, description, status) {
    this.actionId = actionId;
    this.ownerId = ownerId;
    this.title = title;
    this.creatorId= creatorId;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.currentAmount = currentAmount;
    this.goalAmount = goalAmount;
    this.description = description;
    this.status = status;
  }
  
}
