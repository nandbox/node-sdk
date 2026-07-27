const SetDocumentOutMessage = require('../outmessages/SetDocumentOutMessage')
const GetDocumentOutMessage = require('../outmessages/GetDocumentOutMessage')
const DeleteDocumentOutMessage = require('../outmessages/DeleteDocumentOutMessage')
const ListDocumentsOutMessage = require('../outmessages/ListDocumentsOutMessage')

/**
 * Per-bot storage for JSON documents, grouped into collections.
 *
 * Replaces DatabaseService. Two things changed beyond the naming:
 *
 *  - Messages are serialised before sending. DatabaseService called api.send(outMessage), but
 *    api.send writes its argument straight to the socket, so it was sending an object rather than
 *    JSON. Nothing it sent was ever a valid frame.
 *  - The argument order is consistent: every method takes (api, collection, documentId, ...).
 *    The old class took set(api, object, tableName, id) but get(api, id, tableName), so the two
 *    middle arguments swapped between calls with nothing to catch it.
 *
 * Every method replies through callback.onDocumentResponse.
 */
class DocumentStore {
  constructor () {
    if (DocumentStore.instance) {
      return DocumentStore.instance
    }
    DocumentStore.instance = this
  }

  static getInstance () {
    if (!DocumentStore.instance) {
      DocumentStore.instance = new DocumentStore()
    }
    return DocumentStore.instance
  }

  /**
   * Creates the document, or replaces it entirely if the id already exists. There is no partial
   * update: whatever is passed becomes the stored document.
   */
  setDocument (api, collection, documentId, document, reference) {
    const outMessage = new SetDocumentOutMessage()
    outMessage.collection = collection
    outMessage.document_id = documentId
    outMessage.document = document
    outMessage.reference = reference
    api.send(JSON.stringify(outMessage.toJsonObject()))
  }

  /** Fetches one document. The reply carries a null document when the id does not exist. */
  getDocument (api, collection, documentId, reference) {
    const outMessage = new GetDocumentOutMessage()
    outMessage.collection = collection
    outMessage.document_id = documentId
    outMessage.reference = reference
    api.send(JSON.stringify(outMessage.toJsonObject()))
  }

  /** Deletes one document. The reply's ack is 0 when nothing matched. */
  deleteDocument (api, collection, documentId, reference) {
    const outMessage = new DeleteDocumentOutMessage()
    outMessage.collection = collection
    outMessage.document_id = documentId
    outMessage.reference = reference
    api.send(JSON.stringify(outMessage.toJsonObject()))
  }

  /**
   * Lists documents, optionally filtered, sorted and paged. Pass only the options you need:
   *
   *   documentStore.listDocuments(api, 'orders', reference)
   *   documentStore.listDocuments(api, 'orders', reference, {
   *     filter: { status: 'shipped', total: { $gte: 100 } },
   *     sort: { created_at: -1 },
   *     pageSize: 50,
   *     pageNumber: 0
   *   })
   *
   * Operators: $eq $ne $gt $gte $lt $lte $in $nin $exists $contains $like. A bare value means
   * equality. Filtering scans the collection, so keep pages small.
   */
  listDocuments (api, collection, reference, options) {
    const opts = options || {}
    const outMessage = new ListDocumentsOutMessage()
    outMessage.collection = collection
    outMessage.reference = reference
    if (opts.filter != null) outMessage.filter = opts.filter
    if (opts.sort != null) outMessage.sort = opts.sort
    if (opts.pageSize != null) outMessage.page_size = opts.pageSize
    if (opts.pageNumber != null) outMessage.page_number = opts.pageNumber
    api.send(JSON.stringify(outMessage.toJsonObject()))
  }
}

module.exports = DocumentStore.getInstance()
