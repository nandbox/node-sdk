"use strict";

const cellOutMessage = require("./CellOutMessage");


module.exports = class PhotoCellOutMessage extends cellOutMessage {
  constructor() {
    super();
    this.method = "sendCellPhoto";
  }

  toJsonObject() {
    let obj = super.toJsonObject();

    if (this.photo) obj.photo = this.photo;

    return obj;
  }
};
