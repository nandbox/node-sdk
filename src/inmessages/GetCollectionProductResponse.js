"use strict";
const CollectionProduct = require("../data/CollectionProduct");

module.exports = class GetCollectionProductResponse {

    constructor(obj) {
        this.collectionProducts = obj.products != null && obj.products.length ? obj.products.map(product => new CollectionProduct(product)) : [];
        this.app_id = obj.app_id;
        this.reference = obj.reference;

    }

    toJsonObject(){
        let obj = {};

        if (this.collectionProducts && this.collectionProducts.length > 0) {
            obj.collectionProducts = this.collectionProducts.map(product => product.toJsonObject());
        }
        if (this.app_id) obj.app_id = this.app_id;
        if (this.reference) obj.reference = this.reference;

        return obj;
    }
}
