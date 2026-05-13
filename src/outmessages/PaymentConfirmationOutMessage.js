const OutMessage = require("./OutMessage");
module.exports = class PaymentConfirmationOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "submitPaymentResult";
    }
    toJsonObject() {
        let obj = super.toJsonObject();
        if (this.chatId) {
            obj.chat_id = this.chatId;
        }
        if (this.userId) {
            obj.user_id = this.userId;
        }
        if (this.orderId) {
            obj.order_id = this.orderId;
        }
        if (this.providerResponse) {
            obj.providerResponse = this.providerResponse;
        }
        if (this.secret) {
            obj.secret = this.secret;
        }
        if (this.currency) {
            obj.currency = this.currency;
        }
        if (this.totalAmount) {
            obj.total_amount = this.totalAmount;
        }
        if (this.appId) {
            obj.app_id = this.appId;
        }
        if (this.status) {
            obj.status = this.status;
        }
        if (this.debitAmountCents) {
            obj.debit_amount_cents = this.debitAmountCents;
        }
        return obj;
    }


}
