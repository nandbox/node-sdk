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

        return obj;
    }
}
