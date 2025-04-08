"use strict";
const Category = require("../data/Category");

module.exports = class ListCollectionItemResponse {

    constructor(obj) {
        this.Categories = obj.collections != null ? obj.collections.map(category => new Category(category)) : [];
        this.app_id = obj.app_id;
        this.reference = obj.reference;
        this.businessChannelId = obj.business_channel_id;

    }

    toJsonObject() {
        let obj = {};
        if (this.app_id) obj.app_id = this.app_id;
        if (this.reference) obj.reference=this.reference;
        if (this.Categories && this.Categories.length > 0) obj.collections = this.Categories.map(category => category.toJsonObject());
        if (this.businessChannelId)  obj.business_channel_id = this.businessChannelId; 
        return obj;
    }
}
