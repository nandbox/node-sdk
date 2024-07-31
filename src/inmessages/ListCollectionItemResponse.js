"use strict";
const Category = require("../data/Category");

module.exports = class ListCollectionItemResponse {

    constructor(obj) {
        this.Categories = obj.data != null ? obj.data.map(category => new Category(category)) : [];
    }

    toJsonObject() {
        let obj = {};

        if (this.Categories && this.Categories.length > 0) obj.data = this.Categories.map(category => category.toJsonObject());

        return obj;
    }
}
