module.exports = class ExtensionDocResponse {

    constructor(obj) {

        this.id = null;
        this.tableName = null;
        this.doc = null;
        this.ref = null;
        this.appId = null;
        this.method = null;

        if (obj.doc_id) {
            this.id = obj.doc_id;
        }

        if (obj.doc_type) {
            this.tableName = obj.doc_type;
        }

        if (obj.doc) {
            try {
                if (typeof obj.doc === "string") {
                    this.doc = JSON.parse(obj.doc);
                } else {
                    this.doc = obj.doc;
                }
            } catch (e) {
                this.doc = {};
            }
        }

        if (obj.ref) {
            this.ref = obj.ref;
        }

        if (obj.app_id) {
            this.appId = obj.app_id;
        }

        if (obj.method) {
            this.method = obj.method;
        }
    }

    getTableName() {
        return this.tableName;
    }

    getId() {
        return this.id;
    }

    getAppId() {
        return this.appId;
    }

    getDoc() {
        return this.doc;
    }

    getRef() {
        return this.ref;
    }

    getMethod() {
        return this.method;
    }

    toJsonObject() {

        let obj = {};

        if (this.id) {
            obj.doc_id = this.id;
        }

        if (this.tableName) {
            obj.doc_type = this.tableName;
        }

        if (this.doc) {
            obj.doc = this.doc;
        }

        if (this.ref) {
            obj.ref = this.ref;
        }

        if (this.appId) {
            obj.app_id = this.appId;
        }

        if (this.method) {
            obj.method = this.method;
        }

        return obj;
    }
}