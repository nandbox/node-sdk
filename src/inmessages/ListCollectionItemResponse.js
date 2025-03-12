"use strict";
const Category = require("../data/Category");

module.exports = class ListCollectionItemResponse {

    constructor(obj) {
        this.Categories = obj.data != null ? obj.data.map(category => new Category(category)) : [];
        this.app_id = obj.app_id;

    }

    toJsonObject() {
        let obj = {};
        if (this.app_id) obj.app_id = this.app_id;

        if (this.Categories && this.Categories.length > 0) obj.data = this.Categories.map(category => category.toJsonObject());

        return obj;
    }
}
