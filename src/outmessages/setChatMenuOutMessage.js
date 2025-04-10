const OutMessage = require("./OutMessage");


module.exports = class SetChatMenuOutMessage extends OutMessage {


    constructor() {
        super();
        this.method = "setChatMenu";
    }

    toJsonObject(){
        let obj = super.toJsonObject();
        if (this.menus) {
        
            obj.menus = this.menus;
        }
        return obj;
    }
}