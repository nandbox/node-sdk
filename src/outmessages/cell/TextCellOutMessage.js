"use strict";

const cellOutMessage = require("./CellOutMessage");


module.exports = class TextCellOutMessage extends cellOutMessage {
  constructor() {
    super();
    this.method = "sendCellMessage";
  }

  toJsonObject() {
    let obj = super.toJsonObject();

    if (this.text) obj.text = this.text;

    return obj;
  }
};
