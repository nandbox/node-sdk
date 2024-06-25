module.exports = class ProductItem {
    constructor(obj){
		this.addons = obj.addons;
		this.description = obj.description;
		this.type = obj.type;
		this.p_code = obj.p_code;
		this.price = obj.price;
		this.vendor = obj.vendor;
		this.variant = obj.variant;
		this.id = obj.id;
		this.attribute = {
			cost: obj.attribute.cost,
			quantity: obj.attribute.quantity,
			hasSkuOrBarcode: obj.attribute.hasSkuOrBarcode,
			tax: obj.attribute.tax,
			message: obj.attribute.message,
			barcode: obj.attribute.barcode
		};
		this.tag = obj.tag;
		this.sku = obj.sku;
		this.keyword = obj.keyword;
		this.bundle = obj.bundle;
		this.image = obj.image.map(img => ({
			width: img.width,
			url: img.url,
			height: img.height
		}));
		this.assign_collection = obj.assign_collection;
		this.compare_at_price = obj.compare_at_price;
		this.main_group_id = obj.main_group_id;
		this.params = obj.params;
		this.server_id = obj.server_id;
		this.version = obj.version;
		this.group_id = obj.group_id;
		this.name = obj.name;
		this.service_profile_id = obj.service_profile_id;
		this.created_date = obj.created_date;
		this.updated_date = obj.updated_date;
		this.category = obj.category;
		this.status = obj.status;
		this.option = obj.option;
		
    }
    toJsonObject() {
		let obj = {};

		if (this.addons) obj.addons = this.addons;
		if (this.description) obj.description = this.description;
		if (this.type) obj.type = this.type;
		if (this.p_code) obj.p_code = this.p_code;
		if (this.price) obj.price = this.price;
		if (this.vendor) obj.vendor = this.vendor;
		if (this.variant) obj.variant = this.variant;
		if (this.id) obj.KEY_ID = this.id;
		if (this.attribute) obj.attribute = {
			cost: this.attribute.cost,
			quantity: this.attribute.quantity,
			hasSkuOrBarcode: this.attribute.hasSkuOrBarcode,
			tax: this.attribute.tax,
			message: this.attribute.message,
			barcode: this.attribute.barcode
		};
		if (this.tag) obj.tag = this.tag;
		if (this.sku) obj.sku = this.sku;
		if (this.keyword) obj.keyword = this.keyword;
		if (this.bundle) obj.bundle = this.bundle;
		if (this.image) obj.image = this.image.map(img => ({
			width: img.width,
			url: img.url,
			height: img.height
		}));
		if (this.assign_collection) obj.assign_collection = this.assign_collection;
		if (this.compare_at_price) obj.compare_at_price = this.compare_at_price;
		if (this.main_group_id) obj.main_group_id = this.main_group_id;
		if (this.params) obj.params = this.params;
		if (this.server_id) obj.server_id = this.server_id;
		if (this.version) obj.version = this.version;
		if (this.group_id) obj.group_id = this.group_id;
		if (this.name) obj.name = this.name;
		if (this.service_profile_id) obj.service_profile_id = this.service_profile_id;
		if (this.created_date) obj.created_date = this.created_date;
		if (this.updated_date) obj.updated_date = this.updated_date;
		if (this.category) obj.category = this.category;
		if (this.status) obj.status = this.status;
		if (this.option) obj.option = this.option;

		

		return obj;

	}
}