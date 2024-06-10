"use strict";
const OutMessage = require("./OutMessage");

module.exports = class PhotoOutMessage extends OutMessage{

    constructor() {
        super();
        this.method = "sendPhoto";
    }

    toJsonObject(){
        let obj = super.toJsonObject();
        
        if (this.photo) obj.photo = this.photo;

        return obj;
    }
}