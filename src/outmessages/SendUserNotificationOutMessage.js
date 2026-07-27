'use strict'

const OutMessage = require('./OutMessage')

/**
 * Sends a notification (SMS, Email or Push) to a single user.
 */
class SendUserNotificationOutMessage extends OutMessage {
  constructor() {
    super()
    this.method = 'sendUserNotification'
  }

  toJsonObject() {
    let obj = super.toJsonObject()

    // Mirrors the Java SDK: an unset type defaults to Push rather than being
    // omitted, because the server requires a notification type.
    obj.type = this.type != null ? this.type : SendUserNotificationOutMessage.PUSH
    if (this.title) obj.title = this.title
    if (this.message) obj.message = this.message
    if (this.account_id) obj.account_id = this.account_id

    return obj
  }
}

SendUserNotificationOutMessage.SMS = 'SMS'
SendUserNotificationOutMessage.EMAIL = 'Email'
SendUserNotificationOutMessage.PUSH = 'Push'

module.exports = SendUserNotificationOutMessage
