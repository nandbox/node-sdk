const OutMessage = require("./OutMessage")

module.exports = class RunCustomCodeOutMessage extends OutMessage {
  constructor() {
    super()
    this.method = "runCustomCode"
  }

  toJsonObject() {
        let obj = super.toJsonObject();
        if (this.user_id) {
          obj.user_id = this.user_id;
        }
        if (this.data) {
          obj.data = this.data;
        }
        if (this.app_id) {
          obj.app_id = this.app_id;
        }
        return obj;
  }
}
