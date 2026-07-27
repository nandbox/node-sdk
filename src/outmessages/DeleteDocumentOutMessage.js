const OutMessage = require('./OutMessage')

/**
 * Deletes one document by its id.
 *
 * Replaces DeleteRecordOutMessage.
 */
module.exports = class DeleteDocumentOutMessage extends OutMessage {
  constructor () {
    super()
    this.method = 'deleteDocument'

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
