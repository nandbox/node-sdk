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
  }

  toJsonObject() {
    let obj;
    if (this.workflowCell) {
      let workflowCellArrayObjnew = [];
      for (let i = 0; i < workflowCell.length; i++)
        workflowCellArrayObjnew.push(workflowCell[i].toJsonObject());
      obj.workflowCell = workflowCellArrayObjnew;
    }

    return obj;
  }
};
