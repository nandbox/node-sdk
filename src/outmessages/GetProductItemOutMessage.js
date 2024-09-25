const OutMessage = require("./OutMessage");

module.exports = class GetProductItemOutMessage extends OutMessage{
    constructor() {
        super();
        this.method = "getProductDetail";
    }
    toJsonObject(){
        let obj = super.toJsonObject();
        
        if (this.id) obj.id = this.id;

        return obj;
    }   
}