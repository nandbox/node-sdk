module.exports = class WhiteList_ak {

    constructor(obj) {


        this.eop = obj.eop;
        this.app_id = obj.app_id;

        this.signups =  obj.signups;
        
        this.reference=obj.reference;

    }

    toJsonObject() {

        let obj = {};
        
        if (this.users) {

            let usersArrayObjnew = [];
            for (let i = 0; i < users.length(); i++) {
                usersArrayObjnew.push(users[i]);
            }
            obj.users = usersArrayObjnew;
        }
        if (this.app_id) obj.app_id = this.app_id;

        if (this.eop) obj.eop = this.eop;
        if (this.reference) obj.reference=this.reference;

        return obj;

    }
}
