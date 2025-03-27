const OutMessage = require("./OutMessage");

module.exports = class GetProductItemOutMessage extends OutMessage{
    constructor() {
        super();
        this.method = "getProductItem";
    }
    toJsonObject(){
        let obj = super.toJsonObject();
        
        if (this.id) obj.id = this.id;
        if (this.app_id) obj.app_id = this.app_id;
        if (this.reference) obj.ref = this.reference
        return obj;
    }   
}