const { default: SignupUser } = require("./SignupUser");

module.exports =  class WhiteListUser  {

	constructor(obj) {
		this.signupUser = obj.signup_user;
		this.tags = obj.tags;

	}

	toJsonObject() {
		let obj = {};

		// Guarded on signupUser (the field actually assigned above); the previous
		// guard read this.signup_user, which never exists, so the key was dropped.
		if (this.signupUser) obj.signup_user = this.signupUser;
		if (this.tags) obj.tags = this.tags;

		return obj;
	}
}
