'use strict'

const Chat = require('./Chat')
const User = require('./User')

/** Returns null for an absent value instead of the string "null"/"undefined". */
const asString = value => (value === null || value === undefined ? null : String(value))

/**
 * A single selectable value inside a menu cell.
 */
class CellValue {
  constructor(jsonObj, value, optionLabel) {
    if (jsonObj !== null && typeof jsonObj === 'object') {
      this.id = asString(jsonObj.id)
      this.value = jsonObj.value
      this.option_label = asString(jsonObj.option_label)
    } else {
      // (id, value, option_label) form, used for scalar cell values.
      this.id = asString(jsonObj)
      this.value = value
      this.option_label = asString(optionLabel)
    }
  }

  toJsonObject() {
    let obj = {}
    if (this.id !== null && this.id !== undefined) obj.id = this.id
    if (this.value !== undefined) obj.value = this.value
    if (this.option_label) obj.option_label = this.option_label
    return obj
  }
}

/**
 * Wraps the cell's value_type, which the server sends either as a bare string or
 * as an object carrying a `data` field.
 */
class ValueType {
  constructor(data) {
    this.data = asString(data)
  }

  toJsonObject() {
    return { data: this.data }
  }
}

/**
 * One cell of a submitted menu form.
 */
class Cell {
  constructor(jsonObj) {
    jsonObj = jsonObj || {}
    this.menu_id = asString(jsonObj.menu_id)
    this.cell_id = asString(jsonObj.cell_id)
    this.form = asString(jsonObj.form)
    this.style = asString(jsonObj.style)
    this.label = asString(jsonObj.label)
    this.callback = asString(jsonObj.callback)

    const valueTypeObj = jsonObj.value_type
    if (valueTypeObj !== null && typeof valueTypeObj === 'object') {
      this.value_type = valueTypeObj.data != null ? new ValueType(valueTypeObj.data) : null
    } else if (valueTypeObj != null) {
      this.value_type = new ValueType(valueTypeObj)
    } else {
      this.value_type = null
    }

    const valueObj = jsonObj.value
    if (Array.isArray(valueObj)) {
      this.value = valueObj
        .filter(o => o !== null && typeof o === 'object')
        .map(o => new CellValue(o))
    } else if (valueObj !== null && typeof valueObj === 'object') {
      this.value = [new CellValue(valueObj)]
    } else if (valueObj !== undefined && valueObj !== null) {
      this.value = [new CellValue(null, valueObj, null)]
    } else {
      this.value = null
    }
  }

  toJsonObject() {
    let obj = {}
    if (this.menu_id) obj.menu_id = this.menu_id
    if (this.cell_id) obj.cell_id = this.cell_id
    if (this.form) obj.form = this.form
    if (this.style) obj.style = this.style
    if (this.label) obj.label = this.label
    if (this.callback) obj.callback = this.callback
    if (this.value_type) obj.value_type = this.value_type.toJsonObject()
    if (this.value) obj.value = this.value.map(v => v.toJsonObject())
    return obj
  }
}

/**
 * Inbound `menuCallback` event: the values a user submitted from a menu.
 */
class MenuCallback {
  constructor(jsonObj) {
    jsonObj = jsonObj || {}
    this.menu_id = asString(jsonObj.menu_id)
    this.menu_group = asString(jsonObj.menu_group)
    this.source = asString(jsonObj.source)
    this.api_id = asString(jsonObj.api_id)
    this.app_id = asString(jsonObj.app_id)
    this.chat = jsonObj.chat != null ? new Chat(jsonObj.chat) : null
    this.from = jsonObj.from != null ? new User(jsonObj.from) : null
    this.date = jsonObj.date != null ? Number(jsonObj.date) : 0
    this.cells = Array.isArray(jsonObj.cells)
      ? jsonObj.cells.filter(o => o !== null && typeof o === 'object').map(o => new Cell(o))
      : null
  }

  getCells() {
    return this.cells
  }

  toJsonObject() {
    let obj = {}
    if (this.menu_id) obj.menu_id = this.menu_id
    if (this.menu_group) obj.menu_group = this.menu_group
    if (this.source) obj.source = this.source
    if (this.api_id) obj.api_id = this.api_id
    if (this.app_id) obj.app_id = this.app_id
    if (this.chat) obj.chat = this.chat.toJsonObject()
    if (this.from) obj.from = this.from.toJsonObject()
    obj.date = this.date
    if (this.cells) obj.cells = this.cells.map(c => c.toJsonObject())
    return obj
  }
}

MenuCallback.Cell = Cell
MenuCallback.CellValue = CellValue
MenuCallback.ValueType = ValueType

module.exports = MenuCallback
