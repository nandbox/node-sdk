'use strict'

const KEY_REF = 'ref'
const KEY_APP_ID = 'app_id'
const KEY_METHOD = 'method'

/**
 * Inbound `WebhookEvent` payload: the envelope fields (ref, app_id, method) are
 * lifted out and everything else is exposed as `body`.
 */
class WebhookBody {
  constructor(obj) {
    // Work on a shallow copy so the caller's object is not mutated and `body`
    // does not alias it.
    const payload = Object.assign({}, obj || {})

    if (Object.prototype.hasOwnProperty.call(payload, KEY_REF)) {
      this.ref = payload[KEY_REF] != null ? String(payload[KEY_REF]) : null
      delete payload[KEY_REF]
    } else {
      this.ref = null
    }

    if (Object.prototype.hasOwnProperty.call(payload, KEY_APP_ID)) {
      this.appId = payload[KEY_APP_ID] != null ? String(payload[KEY_APP_ID]) : null
      delete payload[KEY_APP_ID]
    } else {
      this.appId = null
    }

    if (Object.prototype.hasOwnProperty.call(payload, KEY_METHOD)) {
      this.method = payload[KEY_METHOD] != null ? String(payload[KEY_METHOD]) : null
      delete payload[KEY_METHOD]
    } else {
      this.method = null
    }

    this.body = payload
  }

  getRef() {
    return this.ref
  }

  getAppId() {
    return this.appId
  }

  getMethod() {
    return this.method
  }

  getBody() {
    return this.body
  }

  toJsonObject() {
    let obj = Object.assign({}, this.body)
    if (this.ref) obj[KEY_REF] = this.ref
    if (this.appId) obj[KEY_APP_ID] = this.appId
    if (this.method) obj[KEY_METHOD] = this.method
    return obj
  }
}

module.exports = WebhookBody
