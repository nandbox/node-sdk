"use strict";

const cellOutMessage = require("./CellOutMessage");

/**
 * This class represents Cell Output Message used to send cell photo.
 *
 * @author Samy
 *
 */

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
