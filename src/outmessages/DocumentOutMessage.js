"use strict";

const OutMessage = require("./OutMessage");

module.exports = class DocumentOutMessage extends OutMessage {
   

    constructor() {
        super();
        this.method = "sendDocument";
    }

    toJsonObject(){
        // Was `let obj = {}`, which discarded method, chat_id, reference, caption
        // and app_id from the base class, and read a non-existent _document field.
        let obj = super.toJsonObject();

        if (this.document) obj.document = this.document;
        if (this.name) obj.name = this.name;
        if (this.size) obj.size = this.size;

        return obj;
    }
} 