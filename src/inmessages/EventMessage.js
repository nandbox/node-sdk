const asString = value => (value == null ? null : String(value))

/**
 * A change on an event the account is subscribed to.
 *
 * The payload is deliberately left as a raw object. The server decides per event which keys
 * survive its filter, and that set changes without a client release - so modelling the payload
 * as fixed fields would silently drop whatever was added and break on whatever was removed.
 * Read what you need out of `body` and tolerate a missing key.
 *
 *   callback.onEventMessage = eventMessage => {
 *     if (eventMessage.event === 'product') {
 *       const id = eventMessage.body.id
 *       const price = eventMessage.body.price      // may be absent
 *     }
 *   }
 *
 * `body` is the whole message, so method, event and app_id are in there too alongside the
 * payload keys.
 */
module.exports = class EventMessage {
  constructor (obj) {
    /** The message as received. Its keys vary by event and by the server side filter. */
    this.body = obj != null && typeof obj === 'object' ? obj : {}

    this.method = asString(this.body.method)

    /** Which event fired: product, chat, chatMember, content or order. */
    this.event = asString(this.body.event)

    this.app_id = asString(this.body.app_id)
  }

  /** Convenience for a single key, undefined when the filter did not include it. */
  get (key) {
    return this.body[key]
  }
}
