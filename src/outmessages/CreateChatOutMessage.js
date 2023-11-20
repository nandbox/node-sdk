const OutMessage = require("../outmessages/OutMessage");

module.exports = class CreateChatOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "createChat";
    }

    toJsonObject(){
        let obj = super.toJsonObject();
        let chat = {};
        obj.chat = chat;
        switch (this.type){
            case "Group":
                chat.type = "Group";
                chat.reference = "CreateGroupRef";
                chat.isPublic = this.isPublic;
                chat.timezone = "Africa/Cairo";
                break;
        }
        return obj;
    }

};