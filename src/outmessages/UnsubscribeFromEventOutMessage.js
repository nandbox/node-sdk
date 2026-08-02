const EventSubscriptionOutMessage = require('./EventSubscriptionOutMessage')

/**
 * Stops delivery of one or more events to an account.
 *
 *   const msg = new UnsubscribeFromEventOutMessage()
 *   msg.appId = '1234'
 *   msg.event = 'product'
 *
 * The reply is an eventResponse. Unsubscribing from something you are not subscribed to still
 * acks. Unsubscribing yourself never requires a privilege.
 */
module.exports = class UnsubscribeFromEventOutMessage extends EventSubscriptionOutMessage {
  constructor () {
    super()
    this.method = 'unsubscribeFromEvent'
  }
}
