const OutMessage = require('./OutMessage')

/**
 * Shared body of SubscribeToEventOutMessage and UnsubscribeFromEventOutMessage. Both carry the
 * same fields and differ only in method.
 *
 * An event is a stream of app activity - product, chat, chatMember, content, order - that the
 * server pushes as an eventMessage to every subscribed account.
 *
 * Set either `event` for the single case or `events` for several.
 * `account_id` acts on another account and requires the caller to be an admin of the app;
 * leave it unset to act on yourself.
 */
module.exports = class EventSubscriptionOutMessage extends OutMessage {
  constructor () {
    super()

    this.event = null
    this.events = null
    this.account_id = null
  }

  toJsonObject () {
    const obj = super.toJsonObject()

    if (Array.isArray(this.events) && this.events.length > 0) {
      obj.events = this.events
    }
    if (this.event != null) obj.event = this.event
    if (this.account_id != null) obj.account_id = this.account_id

    return obj
  }
}
