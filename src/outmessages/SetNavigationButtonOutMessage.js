"use strict";
const OutMessage = require("./OutMessage");
const Button = require("../data/Button");

module.exports = class SetNavigationButtonOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "setNavigationButton";
    }

    toJsonObject(){
        let obj = super.toJsonObject();
        if (this.navigation_button){
           obj.navigation_button = this.navigation_button
        }
        if (this.nav_type){
                obj.nav_type = this.nav_type
        }
        if (this.menu_open){
              obj.menu_open = this.menu_open
        }

        return obj;
    }
}