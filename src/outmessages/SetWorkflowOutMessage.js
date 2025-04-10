const OutMessage = require("../outmessages/OutMessage");

module.exports = class UpdateMenuCell extends OutMessage {
  constructor() {
    super();
    this.method = "updateMenuCell";
  }

  toJsonObject() {
    let obj = super.toJsonObject();
    

    obj.cells = this.cells;
    if (this.user_id) obj.user_id = this.user_id;
    if (this.menu_id) obj.menu_id = this.menu_id;
    if (this.cells) obj.cells = this.cells;
    if (this.app_id) obj.app_id = this.app_id;
    if (this.disable_notification)
      obj.disable_notification = this.disable_notification;

    return obj;
  }
};
