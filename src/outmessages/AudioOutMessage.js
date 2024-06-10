"use strict";

const OutMessage = require("./OutMessage");

module.exports = class AudioOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "sendAudio";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.audio) obj.audio = this.audio;
        if (this.performer) obj.performer = this.performer;
        if (this.title) obj.title = this.title;

        return obj;
    }
}