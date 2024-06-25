const CollectionProduct = require("../data/CollectionProduct");

module.exports = class GetCollectionProductResponse {

    constructor(obj) {
        this.CollectionProduct = new CollectionProduct(obj)
    }

    toJsonObject(){
        let obj;

        if (this.CollectionProduct) obj.collectionProduct = this.CollectionProduct.toJsonObject();

        return obj;
    }
}