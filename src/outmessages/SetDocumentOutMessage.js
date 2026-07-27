const OutMessage = require('./OutMessage')

/**
 * Stores a document in a collection, creating it or replacing it in place.
 *
 * Replaces SetRecordOutMessage. The "table" vocabulary it used implied columns and a schema that
 * the document store does not have.
 */
module.exports = class SetDocumentOutMessage extends OutMessage {
  constructor () {
    super()
    this.method = 'setDocument'

    this.collection = null
    this.document_id = null
    this.document = null
  }

  toJsonObject () {
    const obj = super.toJsonObject()

    if (this.collection != null) obj.collection = this.collection
    if (this.document_id != null) obj.document_id = this.document_id
    if (this.document != null) obj.document = this.document

    return obj
  }
}
