const OutMessage = require('../outmessages/OutMessage');

module.exports = class AddWhitelistPatternsOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'addWhitelistPatterns';
    }
    
	toJsonObject() {
        let obj = super.toJsonObject();
        
		if (this.data) obj.patterns = this.data;

		return obj;
	}
}
