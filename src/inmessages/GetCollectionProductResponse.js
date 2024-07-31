"use strict";
const CollectionProduct = require("../data/CollectionProduct");

module.exports = class GetCollectionProductResponse {

    constructor(obj) {
        this.collectionProducts = obj != null && obj.length ? obj.map(product => new CollectionProduct(product)) : [];
    }

    toJsonObject(){
        let obj = {};

        if (this.collectionProducts && this.collectionProducts.length > 0) {
            obj.collectionProducts = this.collectionProducts.map(product => product.toJsonObject());
        }

        return obj;
    }
}
