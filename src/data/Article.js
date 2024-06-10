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

		if (this.id) obj.KEY_ID=this.id;
		if (this.width) obj.KEY_WIDT= this.width;
		if (this.height) obj.KEY_HEIGHT=this.height;
		if (this.size) obj.KEY_SIZE= this.size;
		if (this.thumbnail) obj.KEY_THUMBNAIL= this.thumbnail;

		return obj;

	}
}