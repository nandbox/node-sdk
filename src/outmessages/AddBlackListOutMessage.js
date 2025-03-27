const OutMessage = require('./OutMessage');
module.exports =  class AddBlackListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'addToBlacklist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.signups = this.users;

		return obj;
	}
}
