
module.exports = class Image {

    constructor(jsonobj) {
        if (!jsonobj)
            return;
        this.width = jsonobj.width;
        this.url = jsonobj.url;
        this.height = jsonobj.height;
    }

    toJsonObject() {
        let obj = {};

        if (this.width) obj.width = this.width;
        if (this.url) obj.url = this.url;
        if (this.height) obj.height = this.height;

        return obj;
    }

}
