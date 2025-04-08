const ProductItem = require("../data/ProductItem");

module.exports = class GetProductItemResponse {

    constructor(obj) {
        this.productItem = new ProductItem(obj.data)
        this.appId = obj.app_id;
        this.reference = obj.reference;
    }

    toJsonObject(){
        let obj;

        if (this.productItem) obj.productItem = this.productItem.toJsonObject();
        if (this.appId) obj.app_id = this.appId;
        if (this.reference) obj.reference = this.reference;

        return obj;
    }
}