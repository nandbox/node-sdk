
module.exports = class PermanentUrl {

    constructor(jsonObj) {
        this.url = jsonObj.url;
        this.file= jsonObj.file;
        this.param1 = jsonObj.param1;	
    }

    toJsonObject(){
        let obj;

        if (this.url)obj.url =  this.url;
        if (this.file)obj.file =  this.file;
        if (this.param1)obj.param1 =  this.param1;
        
        return obj;
    }

}