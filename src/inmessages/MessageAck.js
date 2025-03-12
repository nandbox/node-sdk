module.exports = class MessageAck {

    constructor(jsonObj) {
        let obj = {};

        obj = jsonObj.ack;
        this.message_id = obj.message_id;
        this.reference = obj.reference;
        this.date = obj.date;
        this.app_id = obj.app_id;

    }

    toJsonObject(){
        let obj = {};

        if (this.date) obj.date = this.date
        if (this.message_id) obj.message_id = this.message_id;
        if (this.reference) obj.reference = this.reference;
        if (this.app_id) obj.app_id = this.app_id;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }
    
}