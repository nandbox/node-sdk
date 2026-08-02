const EventSubscriptionOutMessage = require('./EventSubscriptionOutMessage')

/**
 * Subscribes an account to one or more events of an app.
 *
 *   const msg = new SubscribeToEventOutMessage()
 *   msg.appId = '1234'
 *   msg.event = 'product'              // or msg.events = ['product', 'order']
 *
 * The reply is an eventResponse, delivered to callback.onEventResponse. Subscribing twice is
 * harmless. From then on every matching change arrives as an eventMessage.
 *
 * The account has to be a member of the app, and events with privileges attached (product, chat,
 * chatMember, order) also require the matching privilege, otherwise the reply carries an error
 * and ack false.
 */
module.exports = class SubscribeToEventOutMessage extends EventSubscriptionOutMessage {
  constructor () {
    super()
    this.method = 'subscribeToEvent'
  }
}
