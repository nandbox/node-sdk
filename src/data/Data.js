module.exports =  class Data {


	constructor(obj) {
		this.pattern = obj.pattern;
		this.example = obj.example;
		this.id = obj.id;
		// ApiAddWhitelistPatterns reads "tags" off each pattern, but this class never
		// carried the field, so tags could not be assigned through the SDK.
		this.tags = obj.tags;

	}

	toJsonObject() {
		let obj = {};

		if (this.pattern) obj.pattern = this.pattern;
		if (this.example) obj.example = this.example;
		if (this.id) obj.id=this.id;
		if (this.tags) obj.tags = this.tags;
		return obj;

	}
}
