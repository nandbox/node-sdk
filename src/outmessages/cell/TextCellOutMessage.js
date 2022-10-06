"use strict";

const cellOutMessage = require("./CellOutMessage");

/**
 * This class represents Cell Output Message used to send cell message .
 *
 * @author Samy
 *
 */

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
