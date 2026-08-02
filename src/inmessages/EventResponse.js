const asString = value => (value == null ? null : String(value))

/**
 * Reply to subscribeToEvent, unsubscribeFromEvent and listEventSubscriptions.
 *
 * `ack` is the only success test: false means nothing changed and `error` says why. Common
 * errors are 400 (missing app id, or an event the server does not publish), 160017 (privilege
 * missing for that event), 160024 (the account is not a member of the app) and 160015 (unknown
 * app).
 *
 * For a subscribe or unsubscribe reply, `events` echoes what the request asked for. For a list
 * reply, it is the account's current subscriptions.
 */
module.exports = class EventResponse {
  constructor (obj) {
    /** eventResponse or listEventSubscriptionsResponse. */
    this.method = asString(obj.method)

    /** Always an array; empty when a list reply found no subscriptions. */
    this.events = Array.isArray(obj.events)
      ? obj.events.filter(item => item != null).map(String)
      : []

    // single event requests also echo "event"; keep the list authoritative either way
    const single = asString(obj.event)
    if (single != null && !this.events.includes(single)) this.events.push(single)

    /** The first event, for the common single event request. Null when there are none. */
    this.event = this.events.length > 0 ? this.events[0] : null

    this.app_id = asString(obj.app_id)

    /** The account the subscription applies to, which is the caller unless one was set. */
    this.account_id = asString(obj.account_id)

    /** True when the request took effect. False means look at `error`. */
    this.ack = obj.ack != null ? obj.ack === true || obj.ack === 'true' : null

    /** Server error code, set only when ack is false. */
    this.error = obj.error != null ? parseInt(obj.error, 10) : null

    this.reference = asString(obj.reference != null ? obj.reference : obj.ref)
  }
}
