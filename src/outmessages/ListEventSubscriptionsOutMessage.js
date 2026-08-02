const OutMessage = require('./OutMessage')

/**
 * Lists the events an account is currently subscribed to in an app, so a client can reconcile
 * after a reconnect instead of blindly re-subscribing.
 *
 *   const msg = new ListEventSubscriptionsOutMessage()
 *   msg.appId = '1234'
 *
 * The reply is a listEventSubscriptionsResponse, delivered to callback.onEventResponse with the
 * events in response.events.
 */
module.exports = class ListEventSubscriptionsOutMessage extends OutMessage {
  constructor () {
    super()
    this.method = 'listEventSubscriptions'

    /** Leave unset to list your own subscriptions. Another account requires app admin. */
    this.account_id = null
  }

  toJsonObject () {
    const obj = super.toJsonObject()

    if (this.account_id != null) obj.account_id = this.account_id

    return obj
  }
}
