const OutMessage = require('../outmessages/OutMessage');

module.exports = class AddWhiteListOutMessage extends OutMessage {

	// private WhiteListUser whiteListUser;
	constructor() {
		super();
		this.method = 'addToWhitelist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
		

		obj.signups = this.users;

		return obj;
	}

}
