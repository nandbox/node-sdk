module.exports =  class Data {


	constructor(obj) {
		this.pattern = obj.pattern;
		this.example = obj.example;
		this.id = obj.id;

	}

	toJsonObject() {
		let obj = {};

		if (this.pattern) obj.pattern = this.pattern;
		if (this.example) obj.example = this.example;
		if (this.id) obj.id=this.id;
		return obj;

	}
}
