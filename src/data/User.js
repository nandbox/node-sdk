"use strict";
const Photo = require("./Photo");

module.exports = class User {


    constructor(jsonobj){

        if(!jsonobj){
            this.profile ="other";
            return;
        }
            
        this.id =  jsonobj.id;
		this.name =  jsonobj.name;
		this.version =  jsonobj.version;
		this.terminal =  jsonobj.terminal;
		this.type =  jsonobj.type;		
		this.is_bot =  jsonobj.is_bot;
		this.lastSeen =  jsonobj.last_seen;
		this.status =  jsonobj.status;
		this.profile =  jsonobj.profile!=null?jsonobj.profile : "other";
		this.login_id =  jsonobj.login_id;
        

		this.photo = jsonobj.photo != null ? new Photo(jsonobj.photo) : null;

        this.shortName = jsonobj.short_name;
    }

    toJsonObject(){
        let obj = {};

        if(this.id) obj.id = this.id;
        if(this.name) obj.name = this.name;
        if(this.version) obj.version = this.version;
        if(this.terminal) obj.terminal = this.terminal;
        if(this.type) obj.type = this.type;
        if(this.is_bot) obj.is_bot = this.is_bot;
        if(this.last_seen) obj.last_seen = this.last_seen;
        if(this.status) obj.status = this.status;
        if(this.profile) obj.profile = this.profile;
        if(this.photo) obj.photo = this.photo;
        if(this.shortName) obj.short_name = this.shortName;
        if(this.login_id) obj.login_id = this.login_id;

        return obj;
        
    }

}