const OutMessage = require('../outmessages/OutMessage');

module.exports = class SetAdminChatMenuOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = OutMessageMethod.setAdminChatMenu;
	}

	toJsonObject() {
		let obj = super.toJsonObject();
		if (this.menus) {
			obj.menus = this.menus;
		}
		return obj;
	}
}
