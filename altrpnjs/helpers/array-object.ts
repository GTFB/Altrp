import _ from 'lodash'

class ArrayObject {
  private value: Record<string, Array<string>>

  constructor() {
    this.value = {}
  }

  add(key, val) {
    if (!this.value[key]) {
      this.value[key] = [val]
    } else if (!this.value[key].includes(val)) {
      this.value[key].push(val)
    }
  }

  remove(key, val) {
    if (!key || !this.value[key]) {
      return
    }

    _.pull(this.value[key], val)

    if (this.value[key].length <= 0) {
      delete this.value[key]
    }
  }

  get(key) {
    return this.value[key]
  }

  getAsString(key) {
    if (this.value[key]) {
      return this.value[key].join(',')
    }

    return ''
  }

  getEntries() {
    return Object.entries(this.value)
  }
}

export default ArrayObject
