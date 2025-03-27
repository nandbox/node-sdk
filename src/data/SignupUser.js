
module.exports = class SignupUser {

	constructor(obj) {
		this.id = obj.id;
		this.signup_id = obj.signup_id;

	}

	toJsonObject() {
		let obj = {};

		if (this.id) obj.id = this.id;
		if (this.signup_id) obj.signup_id = this.signup_id;

		return obj;

	}

}
