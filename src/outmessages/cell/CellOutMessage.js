"use strict";

const OutMessage = require("../OutMessage");



module.exports = class CellOutMessage extends OutMessage {
  constructor() {
    super();
    // this.method = "cellOutMessage";
  }

  toJsonObject() {
    let obj = super.toJsonObject();

    // The API sets user_id/screen_id/cell_id, and the protocol uses snake_case
    // keys. Reading camelCase properties and writing camelCase keys meant cell
    // messages went out with no target user, screen or cell.
    if (this.user_id) obj.user_id = this.user_id;
    if (this.screen_id) obj.screen_id = this.screen_id;
    if (this.cell_id) obj.cell_id = this.cell_id;

    return obj;
  }
};
