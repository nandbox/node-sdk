const OutMessage = require("./OutMessage");

module.exports = class SetRecordOutMessage extends OutMessage {
    constructor() {
        super();
        this.method = "extensionSetDoc";

        this.id = null;
        this.tableName = null;
        this.doc = null;
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

    setDoc(doc) {
        this.doc = doc;
    }

    getDoc() {
        return this.doc;
    }

    toJsonObject() {
        const obj = super.toJsonObject ? super.toJsonObject() : {};

        if (this.tableName != null) {
            obj.doc_type = this.tableName;
        }

        if (this.id != null) {
            obj.doc_id = this.id;
        }

        if (this.doc != null) {
            obj.doc = this.doc;
        }

        return obj;
    }
};