const OutMessage = require("./OutMessage");

module.exports = class ListRecordsOutMessage extends OutMessage {
    constructor() {
        super();
        this.method = "extensionListDoc";

        this.tableName = null;
    }

    setTableName(tableName) {
        this.tableName = tableName;
    }

    getTableName() {
        return this.tableName;
    }

    toJsonObject() {
        const obj = super.toJsonObject ? super.toJsonObject() : {};

        if (this.tableName != null) {
            obj.doc_type = this.tableName;
        }

        return obj;
    }
};