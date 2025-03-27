const OutMessage = require('../outmessages/OutMessage');

module.exports = class AddBlacklistPatternsOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'addBlacklistPatterns';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
    
        if (this.data) obj.patterns = this.data;
	
		return obj;
	}
}
