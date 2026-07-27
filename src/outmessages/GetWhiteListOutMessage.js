const OutMessage = require('../outmessages/OutMessage');


module.exports = class GetWhiteListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'getWhitelistUsers';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.page_size) obj.page_size = this.page_size;
		
		return obj;
	}

}
