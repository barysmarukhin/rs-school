// WARNING: replace ... with your code
function Node(key, value) {
    this.key = key;
    this.value = value;

    //please don't rename left, right and root properties
    this._left = null;
    this._right = null;
}

function BinarySearchTree() {
    this._root = null;
}
BinarySearchTree.prototype.constructor = BinarySearchTree;

BinarySearchTree.prototype.root = function () {
    return this._root;
}

BinarySearchTree.prototype.insert = function () {
    const node = new Node(key, value);
    let current;
    if (!this._root) {
        this._root = node;
    } else {
        current = this._root;
        if (value < current.value) {
            if(!current._left) {
                current._left = node;
                return this;
            } else {
                current = current._left;
            }
        } else if (value > current.value) {
            if(!current._right) {
                current._right = node;
                return this;
            } else {
                current = current._right;
            }
        } else {
            return this;
        }
    }
}

BinarySearchTree.prototype.delete = function () {

}

BinarySearchTree.prototype.search = function () {

}

BinarySearchTree.prototype.contains = function (value) {
    let current = this._root;
    let foundItem = false;
    while(!foundItem && current) {
        if (current.key === value) {
            foundItem = true;
        } else {
            if (value > current.value) {
                current = current._right;
            } else if (value < current.value) {
                current = current._left;
            } 
        }
    }
    return foundItem;
}

BinarySearchTree.prototype.traverse = function () {

}

BinarySearchTree.prototype.verify = function () {

}

// const bst = new BinarySearchTree();
// bst.prototype = Object.create(BinarySearchTree.prototype);

// You can comment this block for testing in the browser but final solution MUST contains this module.exports code
module.exports = {
  BinarySearchTree,
  student: 'YOUR GITHUB ACCOUNT'
};
