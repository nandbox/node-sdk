const OutMessage = require('./OutMessage')

/**
 * Lists documents in a collection, optionally filtered, sorted and paged.
 *
 * Replaces ListRecordsOutMessage, which could only fetch an entire collection in one unbounded
 * response.
 *
 *   const msg = new ListDocumentsOutMessage()
 *   msg.collection = 'orders'
 *   msg.filter = { status: 'shipped', total: { $gte: 100 } }
 *   msg.sort = { created_at: -1 }     // -1 descending, 1 ascending
 *   msg.page_size = 50
 *   msg.page_number = 0
 *
 * Operators: $eq $ne $gt $gte $lt $lte $in $nin $exists $contains $like.
 * A bare value means equality.
 */
module.exports = class ListDocumentsOutMessage extends OutMessage {
  constructor () {
    super()
    this.method = 'listDocuments'

    this.collection = null
    this.filter = null
    this.sort = null
    /** Server default is 50 and the hard ceiling is 200; larger values are clamped. */
    this.page_size = null
    /** Zero-based. */
    this.page_number = null
  }

  toJsonObject () {
    const obj = super.toJsonObject()

    if (this.collection != null) obj.collection = this.collection
    if (this.filter != null) obj.filter = this.filter
    if (this.sort != null) obj.sort = this.sort
    if (this.page_size != null) obj.page_size = this.page_size
    if (this.page_number != null) obj.page_number = this.page_number

    return obj
  }
}
