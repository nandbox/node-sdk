const Chat = require('../data/Chat');
const SignupUser = require('../data/SignupUser');

module.exports = class WhiteList {

	constructor(obj) {


		this.eop = obj.eop;
		this.app_id = obj.app_id;

		let usersArrayObj = obj.signups;
		this.signups = [];
		for (let i = 0; i < usersArrayObj.length; i++) {
			this.signups[i] = new SignupUser(usersArrayObj[i]);
		}
		this.reference=obj.reference;

	}

    toJsonObject() {

		let obj = {};
		
		if (this.users) {

			let usersArrayObjnew = [];
			for (let i = 0; i < users.length(); i++) {
				usersArrayObjnew.push(users[i].toJsonObject());
			}
			obj.users = usersArrayObjnew;
		}
		if (this.app_id) obj.app_id = this.app_id;

		if (this.eop) obj.eop = this.eop;
		if (this.reference) obj.reference=this.reference;

		return obj;

	}
}
