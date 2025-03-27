const Data = require('../data/Data');

module.exports = class Pattern {
    constructor(obj) {
        this.appId = obj.app_id ? parseInt(obj.app_id) : 0;
        this.data = [];

        if (obj.data && Array.isArray(obj.data)) {
            for (let i = 0; i < obj.data.length; i++) {
                this.data.push(new Data(obj.data[i]));
            }
        }

        this.reference = obj.reference ? parseInt(obj.reference) : 0;
    }

    toJson() {
        let obj = {};

        if (this.data.length > 0) {
            obj.data = this.data.map(item => item.toJsonObject());
        }

        if (this.appId) {
            obj.app_id = this.appId;
        }

        if (this.reference) {
            obj.reference = this.reference;
        }

        return obj;
    }
};
