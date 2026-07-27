const OutMessage = require("./OutMessage");

module.exports = class InlineSearchAnswer extends OutMessage{

    constructor() {
        super();
        this.method = "inlineSearchAnswer";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.results) {
            let resultArrayObj = [];
            for (let i = 0; i < this.results.length; i++) {
                resultArrayObj.push(this.results[i].toJsonObject());
            }
            obj.results = resultArrayObj;
        }

        if (this.search_id) obj.search_id = this.search_id;
        if (this.next_offset) obj.next_offset = this.next_offset;

        return obj;
    }
}