const OutMessage = require('./OutMessage')

/**
 * Fetches one document by its id.
 *
 * Replaces GetRecordOutMessage.
 */
module.exports = class GetDocumentOutMessage extends OutMessage {
  constructor () {
    super()
    this.method = 'getDocument'

    this.collection = null
    this.document_id = null
  }

  toJsonObject () {
    const obj = super.toJsonObject()

    if (this.collection != null) obj.collection = this.collection
    if (this.document_id != null) obj.document_id = this.document_id

    return obj
  }
}
