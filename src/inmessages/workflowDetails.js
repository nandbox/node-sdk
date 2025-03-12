const WorkflowCell = require("../data/WorkflowCell");

module.exports = class WorkflowDetails {
  constructor(jsonObj) {
    let obj = JSON.parse(JSON.stringify(jsonObj));
    this.workflowCell = [];

    let workflowCellArrayObj = obj.workflowCell;
    if (workflowCellArrayObj != null) {
      let workflowCells = [];
      for (let i = 0; i < workflowCellArrayObj.length; i++)
        workflowCells[i] = new WorkflowCell(workflowCellArrayObj[i]);

      this.workflowCell = workflowCells;
    }

    this.screen_id = obj.screen_id;
    this.vapp_id = obj.vapp_id; 
    this.reference = obj.reference; 
    this.user_id = obj.user_id;
    this.app_id = obj.app_id;

  }

  toJsonObject() {
    let obj;
    if (this.workflowCell) {
      let workflowCellArrayObjnew = [];
      for (let i = 0; i < workflowCell.length; i++)
        workflowCellArrayObjnew.push(workflowCell[i].toJsonObject());
      obj.workflowCell = workflowCellArrayObjnew;
    }
    if (this.app_id) obj.app_id = this.app_id;

    if(this.screen_id) obj.screen_id = this.screen_id;
    if(this.vapp_id) obj.vapp_id = this.vapp_id;
    if(this.reference) obj.reference = this.reference;
    if(this.user_id) obj.user_id = this.user_id;

    return obj;
  }
};
