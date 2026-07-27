const asString = value => (value == null ? null : String(value))

/**
 * Reply to any of the document store methods.
 *
 * Replaces ExtensionDocResponse. Two things changed beyond the naming:
 *
 *  - The list reply used to be parsed with JSON.parse(String(array)), which stringifies the array
 *    and re-parses it, so entries came back as strings rather than objects. The server now sends
 *    real objects and this class reads them directly.
 *  - List replies carry the document id alongside each payload, so a caller no longer has to
 *    store the id inside the document to know which one it is looking at.
 */
module.exports = class DocumentResponse {
  constructor (obj) {
    /** Collection the document or documents belong to. */
    this.collection = asString(obj.collection)

    /** Set for get, set and delete replies; null for a list reply. */
    this.document_id = asString(obj.document_id)

    /** The document, for get and set replies. Null when the id was not found. */
    this.document = obj.document != null && typeof obj.document === 'object' ? obj.document : null

    /**
     * One page of documents, for a list reply, as { document_id, document } entries.
     * Null for the single-document methods.
     */
    this.documents = Array.isArray(obj.documents)
      ? obj.documents
        .filter(entry => entry != null && typeof entry === 'object')
        .map(entry => ({
          document_id: asString(entry.document_id),
          document: entry.document != null && typeof entry.document === 'object' ? entry.document : null
        }))
      : null

    this.reference = asString(obj.reference != null ? obj.reference : obj.ref)
    this.app_id = asString(obj.app_id)
    this.method = asString(obj.method)

    /** Rows affected, for set and delete. Zero from a delete means nothing matched. */
    this.ack = obj.ack != null ? parseInt(obj.ack, 10) : null

    /** Page this reply represents, for a list reply. */
    this.page_number = obj.page_number != null ? parseInt(obj.page_number, 10) : null

    /** True when there are no further pages. */
    this.eop = obj.eop != null ? obj.eop === true || obj.eop === 'true' : null
  }
}
