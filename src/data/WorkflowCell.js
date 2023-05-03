module.exports = class WorkflowCell {

    constructor(obj){
        this.cell_id = obj.cell_id;
        this.callback = obj.callback;
        this.api_id = obj.api_id;
        this.cache = obj.cache;
        this.next_screen = obj.next_screen;
        this.url = obj.url;
        this.bg_color = obj.bg_color;
        this.label = obj.label;
        this.label_color = obj.label_color;
        this.sublabel = obj.sublabel;
        this.sublabel_color = obj.sublabel_color;
        this.hint = obj.hint;
        this.value = obj.value;
    }

    toJsonObject(){
        let obj = {};

        if(this.cell_id) obj.cell_id = this.cell_id;
        if(this.callback) obj.callback = this.callback;
        if(this.api_id) obj.api_id = this.api_id;
        if(this.cache) obj.cache = this.cache;
        if(this.next_screen) obj.next_screen = this.next_screen;
        if(this.url) obj.url = this.url;
        if(this.bg_color) obj.bg_color = this.bg_color;
        if(this.label) obj.label = this.label;
        if(this.label_color) obj.label_color = this.label_color;
        if(this.sublabel) obj.sublabel = this.sublabel;
        if(this.sublabel_color) obj.sublabel_color = this.sublabel_color;
        if(this.hint) obj.hint = this.hint;
        if(this.value) obj.value = this.value;

        return obj;
    }
}