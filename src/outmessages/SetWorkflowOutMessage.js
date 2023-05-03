const OutMessage = require("../outmessages/OutMessage");

module.exports = class SetWorkflowOutMessage extends OutMessage {
  constructor() {
    super();
    this.method = "setWorkflow";
  }

  toJsonObject() {
    let obj = super.toJsonObject();
    let workflowCellArrayObj = [];
    for (let i = 0; i < this.workflowCell.length(); i++) {
      workflowCellArrayObj.push(this.workflowCell[i].toJsonObject());
    }

    obj.workflowCell = workflowCellArrayObj;
    if (this.user_id) obj.user_id = this.user_id;
    if (this.screen_id) obj.screen_id = this.screen_id;
    if (this.workflow_cell) obj.workflow_cell = this.workflow_cell;
    if (this.app_id) obj.app_id = this.app_id;
    if (this.disable_notification)
      obj.disable_notification = this.disable_notification;

    return obj;
  }
};
