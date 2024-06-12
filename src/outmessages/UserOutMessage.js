const OutMessage = require("./OutMessage");

module.exports = class UserOutMessage extends OutMessage {
    constructor() {
        super();
        this.method = "sendMessage";
    }
}