const OutMessage = require("./OutMessage");

module.exports = class DeleteRecordOutMessage extends OutMessage {
    constructor() {
        super();
        this.method = "extensionDeleteDoc";

        this.id = null;
        this.tableName = null;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setTableName(tableName) {
        this.tableName = tableName;
    }

    getTableName() {
        return this.tableName;
    }

    toJsonObject() {
        const obj = super.toJsonObject ? super.toJsonObject() : {};

        if (this.id != null) {
            obj.doc_id = this.id;
        }

        if (this.tableName != null) {
            obj.doc_type = this.tableName;
        }

        return obj;
    }
};