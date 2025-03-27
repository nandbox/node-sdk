const OutMessage = require('../outmessages/OutMessage');

module.exports = class DeleteBlackListPatternsOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'removeBlacklistPatterns';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.pattern) obj.patterns = this.pattern;
		
		return obj;
	}
}
