const Node = require('./node');

class LinkedList {
  constructor(length = 0, _head = null, _tail = null) {
    this.length = length;
    this._head = _head;
    this._tail = _tail;
  }

  append(data) {
    const node = new Node(data);
    if (this.isEmpty()) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
    this.length ++;
    return this;
  }

  head() {
    if (this.isEmpty()) {
      return null;
    }
    return this._head.data;
  }

  tail() {
    if (this.isEmpty()) {
      return null;
    }
    return this._tail.data;
  }

  at(index) {
    const node = this.findByIndex(index);
    return node.data || null;
  }

  insertAt(index, data) {
    const node = this.findByIndex(index);
    if (node) {
      node.data = data;
    }
    return this;
  }

  findByIndex(index) {
    if (!this.isEmpty() && index >= 0 && index < this.length) {
      let i = 0;
      let current = this._head;
      while (i < index) {
        current = current.next;
        i++;
      }
      return current;
    }
    return null;
  }

  isEmpty() {
    return !this._head && !this._tail;
  }

  clear() {
    this.length = 0;
    this._head = null;
    this._tail = null;
    return this;
  }

  deleteAt(index) {
    const node = this.findByIndex(index);
    if (node) {
      if (index === 0){
        this._head = this._head.next;
        if (!this._head) { // if this._head is already null (the only one node in the list)
          this._tail = null;
        } else {
          this_head.prev = null;
        }
      } else if (index === this.length - 1) { // if it's the last item
        this._tail = this._tail.prev;
        this._tail.next = null;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
      return this;
    }
    return null;
  }

  reverse() {
    let current = this._head;
    while (current) {
      const saved = current.next;
      current.next = current.prev;
      current.prev = saved;
      current = saved;
    }
    const saved = this._head;
    this._head = this._tail;
    this._tail = saved;
    return this;
  }

  indexOf(data) {
    let current = this._head;
    for (let i = 0; i < this.length; i++) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
}

module.exports = LinkedList;
