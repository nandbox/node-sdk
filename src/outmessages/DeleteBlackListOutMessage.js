const OutMessage = require('../outmessages/OutMessage');

module.exports = class DeleteBlackListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'removeFromBlacklist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.signups = this.users;
		
		return obj;
	}
}
