const OutMessage = require('../outmessages/OutMessage');

module.exports = class DeleteBlackListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'deleteBlacklist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.users = this.users;
		
		return obj;
	}
}
