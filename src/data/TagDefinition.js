
module.exports = class TagDefination {

	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		// Utils was never imported here, so this threw a ReferenceError for any
		// inbound message carrying tagsDefinition. The server sends isPrivate as a
		// boolean (ApiAddChatTag), which parseInt turns into NaN.
		if (obj.isPrivate == null) {
			this.isPrivate = null;
		} else if (typeof obj.isPrivate === 'boolean') {
			this.isPrivate = obj.isPrivate ? 1 : 0;
		} else {
			this.isPrivate = parseInt(obj.isPrivate, 10);
		}

	}

	toJsonObject() {
		let obj = {};

		if (this.id) obj.id = this.id;
		if (this.name) obj.name = this.name;
		if (this.description) obj.description = this.description;
		if (this.isPrivate) obj.isPrivate = this.isPrivate;

		return obj;

	}

}
