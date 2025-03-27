const OutMessage = require('../outmessages/OutMessage');


module.exports = class DeleteWhiteListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'removeFromWhitelist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.signups = this.users;
		
		return obj;
	}
}
