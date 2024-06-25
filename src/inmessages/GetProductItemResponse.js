const ProductItem = require("../data/ProductItem");

module.exports = class GetProductItemResponse {

    constructor(obj) {
        this.productItem = new ProductItem(obj)
    }

    toJsonObject(){
        let obj;

        if (this.productItem) obj.productItem = this.productItem.toJsonObject();

        return obj;
    }
}