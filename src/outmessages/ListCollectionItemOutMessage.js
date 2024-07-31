const OutMessage = require("./OutMessage");

module.exports = class ListCollectionItemOutMessage extends OutMessage{
    constructor() {
        super();
        this.method = "listCollectionItem";
    }
}