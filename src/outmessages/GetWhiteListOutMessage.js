const OutMessage = require('../outmessages/OutMessage');


module.exports = class GetWhiteListOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = 'getWhitelist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.pageSize) obj.page_size = this.page_size;
		
		return obj;
	}

}
