const SetRecordOutMessage = require("../outmessages/SetRecordOutMessage");
const GetRecordOutMessage = require("../outmessages/GetRecordOutMessage");
const DeleteRecordOutMessage = require("../outmessages/DeleteRecordOutMessage");
const ListRecordsOutMessage = require("../outmessages/ListRecordsOutMessage");

class DatabaseService {
    constructor() {
        if (DatabaseService.instance) {
            return DatabaseService.instance;
        }

        DatabaseService.instance = this;
    }

    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }

        return DatabaseService.instance;
    }

    /**
     * INSERT OR UPDATE
     */
    set(api, object, tableName, id, ref) {
        const outMessage = new SetRecordOutMessage();

        outMessage.setTableName(tableName);
        outMessage.setId(id);
        outMessage.setDoc(object);

        if (typeof outMessage.setRef === "function") {
            outMessage.setRef(ref);
        } else {
            outMessage.ref = ref;
        }

        api.send(outMessage);
    }

    /**
     * GET
     */
    get(api, id, tableName, ref) {
        const outMessage = new GetRecordOutMessage();

        outMessage.setTableName(tableName);
        outMessage.setId(id);

        if (typeof outMessage.setRef === "function") {
            outMessage.setRef(ref);
        } else {
            outMessage.ref = ref;
        }

        api.send(outMessage);
    }

    /**
     * DELETE
     */
    delete(api, id, tableName, ref) {
        const outMessage = new DeleteRecordOutMessage();

        outMessage.setTableName(tableName);
        outMessage.setId(id);

        if (typeof outMessage.setRef === "function") {
            outMessage.setRef(ref);
        } else {
            outMessage.ref = ref;
        }

        api.send(outMessage);
    }

    /**
     * LIST
     */
    list(api, tableName, ref) {
        const outMessage = new ListRecordsOutMessage();

        outMessage.setTableName(tableName);

        if (typeof outMessage.setRef === "function") {
            outMessage.setRef(ref);
        } else {
            outMessage.ref = ref;
        }

        api.send(outMessage);
    }
}

module.exports = DatabaseService.getInstance();