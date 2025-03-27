const SignupUser = require('../data/SignupUser');

module.exports =  class BlackList {


	constructor(obj) {

        
		this.eop = obj.eop;

		let usersArrayObj = obj.signups;
		this.users =[];
		for (let i = 0; i < usersArrayObj.length; i++) {
			this.users[i] = new SignupUser(usersArrayObj[i]);
		}
		this.reference=obj.reference;

	}

	toJsonObject() {

		let obj = {};

		if (this.users) {
			let usersArrayObjnew = [];
			for (let i = 0; i < users.length; i++) {
				usersArrayObjnew.push(users[i].toJsonObject());
			}
			obj.users = usersArrayObjnew;
		}
		if (this.eop) obj.eop = this.eop;
		if (this.reference) obj.reference=this.reference;

		return obj;

	}
}
