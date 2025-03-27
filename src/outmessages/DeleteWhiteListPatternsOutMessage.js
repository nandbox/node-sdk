const OutMessage = require('../outmessages/OutMessage');

module.exports = class DeleteWhiteListPatternsOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'removeWhitelistPatterns';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.pattern) obj.patterns = this.pattern;
		
		return obj;
	}
}
