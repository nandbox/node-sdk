const OutMessage = require('../outmessages/OutMessage');

module.exports = class SetAdminChatMenuOutMessage extends OutMessage {

	constructor() {
		super();
		this.method = OutMessageMethod.setAdminChatMenu;
	}

	toJsonObject() {
		let obj = super.toJsonObject();
		if (this.menus) {
			let menusArrayObj = [];
			for (let i = 0; i < menus.length(); i++) {
				menusArrayObj.push(menus[i].toJsonObject());
			}

			obj.menus = menusArrayObj;
		}
		return obj;
	}
}
