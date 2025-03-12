"use strict";
const CollectionProduct = require("../data/CollectionProduct");

module.exports = class GetCollectionProductResponse {

    constructor(obj) {
        this.collectionProducts = obj != null && obj.length ? obj.map(product => new CollectionProduct(product)) : [];
        this.app_id = obj.app_id;

    }

    toJsonObject(){
        let obj = {};

        if (this.collectionProducts && this.collectionProducts.length > 0) {
            obj.collectionProducts = this.collectionProducts.map(product => product.toJsonObject());
        }
        if (this.app_id) obj.app_id = this.app_id;

        return obj;
    }
}
