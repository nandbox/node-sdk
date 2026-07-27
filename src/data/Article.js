const Thumbnail = require("./Thumbnail");


module.exports = class Article {


	constructor(obj) {

		this.id = obj.id;
		this.width = obj.width;
		this.height = obj.height;
		this.size = obj.size;
		this.thumbnail = obj.thumbnail != null ? new Thumbnail(obj.thumbnail) : null;

	}

	toJsonObject() {
		let obj = {};

		// These were emitted under the literal placeholder names KEY_ID, KEY_WIDT,
		// ... (a leftover from the Java port), which the server cannot recognise.
		if (this.id) obj.id = this.id;
		if (this.width) obj.width = this.width;
		if (this.height) obj.height = this.height;
		if (this.size) obj.size = this.size;
		if (this.thumbnail) obj.thumbnail = this.thumbnail.toJsonObject ? this.thumbnail.toJsonObject() : this.thumbnail;

		return obj;

	}
}