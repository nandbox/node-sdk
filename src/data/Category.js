const Image = require("./Image");

module.exports = class Category {

    constructor(jsonobj) {
        if (!jsonobj)
            return;
        this.id = jsonobj.id;
        this.name = jsonobj.name;
        this.description = jsonobj.description;
        this.category = jsonobj.category;
        this.date = jsonobj.date;
        this.version = jsonobj.version;
        this.status = jsonobj.status;

        this.images = jsonobj.image != null ? jsonobj.image.map(img => new Image(img)) : [];
    }

    toJsonObject() {
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.name) obj.name = this.name;
        if (this.description) obj.description = this.description;
        if (this.category) obj.category = this.category;
        if (this.date) obj.date = this.date;
        if (this.version) obj.version = this.version;
        if (this.status) obj.status = this.status;

        if (this.images && this.images.length > 0) obj.image = this.images.map(img => img.toJsonObject());

        return obj;
    }

}
