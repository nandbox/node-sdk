"use strict";

const cellOutMessage = require("./CellOutMessage");



module.exports = class VideoCellOutMessage extends cellOutMessage {
  constructor() {
    super();
    this.method = "sendCellVideo";
  }

  toJsonObject() {
    let obj = super.toJsonObject();

    if (this.video) obj.video = this.video;

    return obj;
  }
};
