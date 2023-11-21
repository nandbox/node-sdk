const OutMessage = require("../outmessages/OutMessage");

module.exports = class SetWorkflowActionOutMessage extends OutMessage {
  constructor() {
    super();
    this.method = "setWorkflowAction";
  }

  toJsonObject() {
    let obj = super.toJsonObject();
   
    if (this.user_id) obj.user_id = this.user_id;
    if (this.screen_id) obj.screen_id = this.screen_id;
    if (this.next_screen) obj.next_screen = this.next_screen;
    if (this.vapp_id) obj.vapp_id = this.vapp_id;
    if (this.reference) obj.reference = this.reference;


    return obj;
  }
};
