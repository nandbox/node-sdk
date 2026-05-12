module.exports = class PaymentRequest {

    constructor(obj){
        obj.order_id ? this.order_id = obj.order_id : null;
        obj.payload ? this.payload = obj.payload : null;
        obj.secret ? this.secret = obj.secret : null;
        obj.currency ? this.currency = obj.currency : null;
        obj.amount ? this.amount = obj.amount : null;
        obj.merchant_name ? this.merchant_name = obj.merchant_name : null;
        obj.account_id ? this.account_id = obj.account_id : null;
        obj.provider_id ? this.provider_id = obj.provider_id : null;
        obj.config ? this.config = obj.config : null;
        obj.debit_amount_cents ? this.debit_amount_cents = obj.debit_amount_cents : null;
    }
    toJsonObject() {
        let obj = {};
        if (this.order_id) {
            obj.order_id = this.order_id;
        }
        if (this.payload) {
            obj.payload = this.payload;
        }
        if (this.secret) {
            obj.secret = this.secret;
        }
        if (this.currency) {
            obj.currency = this.currency;
        }
        if (this.amount) {
            obj.amount = this.amount;
        }
        if (this.merchant_name) {
            obj.merchant_name = this.merchant_name;
        }
        if (this.account_id) {
            obj.account_id = this.account_id;
        }
        if (this.provider_id) {
            obj.provider_id = this.provider_id;
        }
        if (this.config) {
            obj.config = this.config;
        }
        if (this.debit_amount_cents) {
            obj.debit_amount_cents = this.debit_amount_cents;
        }
        return obj;
    }
}