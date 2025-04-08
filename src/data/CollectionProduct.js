module.exports = class CollectionProduct {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.price = obj.price;
        this.status = obj.status;
        this.image = obj.image.map(img => ({
            width: img.width,
            url: img.url,
            height: img.height
        }));
        this.appId = obj.app_id;
        this.businessChannelId = obj.business_channel_id;
        this.category = obj.category;
    }

    toJsonObject() {
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.name) obj.name = this.name;
        if (this.price) obj.price = this.price;
        if (this.status) obj.status = this.status;
        if (this.image) obj.image = this.image.map(img => ({
            width: img.width,
            url: img.url,
            height: img.height
        }));
        if (this.appId) obj.app_id = this.appId;
        if (this.businessChannelId) obj.business_channel_id = this.businessChannelId;
        if (this.category) obj.category = this.category;

        return obj;
    }
}
