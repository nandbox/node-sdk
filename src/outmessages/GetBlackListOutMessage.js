const OutMessage = require('../outmessages/OutMessage');


module.exports = class GetBlackListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'getBlacklistUsers';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.page_size) obj.page_size = this.page_size;
		
		return obj;
	}
}
